import { Injectable, Inject } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { WINDOW } from '../../window/window.provider';

export interface RenderingRulesResult {
  render: boolean;
  classes: string[];
  priority?: number;
}

export interface TileImageServiceImage {
  viewport: string;
  columns: number;
  retina: boolean;
  image: string;
  placeholder?: string;
}

@Injectable()
export class TileImageService {
  mediaQueries = [
    { viewport: 'xxs', query: '(min-width: 0px)' },
    { viewport: 'xs', query: '(min-width: 480px)' },
    { viewport: 's', query: '(min-width: 760px)' },
    { viewport: 'm', query: '(min-width: 1000px)' },
    { viewport: 'l', query: '(min-width: 1300px)' },
    { viewport: 'xl', query: '(min-width: 1760px)' }
  ];

  constructor(private breakpointObserver: BreakpointObserver, @Inject(WINDOW) private window: Window) {}

  getResponsiveImage(images: TileImageServiceImage[], renderingResult$: Observable<RenderingRulesResult>) {
    const viewport$ = this.getViewPort();
    const columns$ = viewport$.pipe(switchMap((viewport) => this.getColumns(renderingResult$, viewport)));

    return combineLatest([viewport$, columns$]).pipe(
      map(([viewport, columns]) => {
        const closestViewportImages = this.getImagesForViewport(images, viewport);

        if (closestViewportImages.length === 0) {
          return null; // Should only happen for viewport xxs and no images provided for xxs
        }

        const closestColumnImages = this.getImagesForColumns(closestViewportImages, columns);

        return this.getImageForRetina(closestColumnImages).image;
      })
    );
  }

  getPlaceholderImage(images: TileImageServiceImage[], renderingResult$: Observable<RenderingRulesResult>) {
    const viewport$ = this.getViewPort();
    const columns$ = viewport$.pipe(switchMap((viewport) => this.getColumns(renderingResult$, viewport)));

    return combineLatest([viewport$, columns$]).pipe(
      map(([viewport, columns]) => {
        const closestViewportImages = this.getImagesForViewport(images, viewport);

        if (closestViewportImages.length === 0) {
          return null; // Should only happen for viewport xxs and no images provided for xxs
        }

        const closestColumnImages = this.getImagesForColumns(closestViewportImages, columns);

        const matchingImage = closestColumnImages.find((image) => !image.retina);
        if (matchingImage && matchingImage.placeholder) {
          return matchingImage.placeholder;
        }
        return null;
      })
    );
  }

  private getImagesForViewport(images: TileImageServiceImage[], viewport: string) {
    const imageViewports = images.map((image) => image.viewport);
    const closestViewport = this.getClosestViewPort(viewport, imageViewports);
    return images.filter((image) => image.viewport === closestViewport);
  }

  private getImagesForColumns(images: TileImageServiceImage[], columns: number) {
    const imagesColumns = images.map((image) => image.columns).sort();
    const closestIndex = imagesColumns.findIndex((imageColumns) => imageColumns >= columns);
    const closestColumns = closestIndex === -1 ? imagesColumns[imagesColumns.length - 1] : imagesColumns[closestIndex];
    return images.filter((image) => image.columns === closestColumns);
  }

  private getImageForRetina(images: TileImageServiceImage[]) {
    if (images.length === 1) {
      return images[0];
    }

    const isHighDensity =
      (this.window.matchMedia &&
        (this.window.matchMedia(
          // tslint:disable-next-line:max-line-length
          'only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)'
        ).matches ||
          this.window.matchMedia(
            // tslint:disable-next-line:max-line-length
            'only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)'
          ).matches)) ||
      (this.window.devicePixelRatio !== undefined && this.window.devicePixelRatio > 1.3);

    if (isHighDensity) {
      const retinaAsset = images.find((image) => image.retina);
      if (retinaAsset) {
        return retinaAsset;
      }
    }
    return images.find((image) => !image.retina);
  }

  /**
   * Calculates the current columns for the tile based on classes from rendering rules and current viewport.
   * @param renderingResult$ The rendering result containing the classes for the tile
   */
  private getColumns(renderingResult$: Observable<RenderingRulesResult>, viewport: string) {
    return renderingResult$.pipe(
      map((result) => {
        const parsedClasses: { [index: string]: number } = result.classes.reduce((theMap, item) => {
          const parsed = this.parseClass(item);
          if (parsed) {
            theMap[parsed.viewport] = parsed.columns;
          }
          return theMap;
        }, {});

        if (Object.keys(parsedClasses).length === 0) {
          throw new Error('No grid classes found in rendering rules result');
        }

        const closestViewport = this.getClosestViewPort(viewport, Object.keys(parsedClasses));
        return parsedClasses[closestViewport];
      })
    );
  }

  /**
   * Parse a class for columns and viewport informations
   * @param renderingRulesClass the class to parse
   * @returns object containing the viewport and columns, or null
   */
  private parseClass(renderingRulesClass: string) {
    const result = /grid__child--size-(\d+)-(\w+)|grid__child--size-(\d+)/.exec(renderingRulesClass);

    if (!result) {
      return null;
    }
    if (result[1] && result[2]) {
      return { viewport: result[2], columns: parseInt(result[1]) };
    }
    return { viewport: 'xxs', columns: parseInt(result[3]) };
  }

  /**
   * Calculate the viewport of the browser based on media queries.
   * @returns the current viewport
   */
  private getViewPort() {
    return this.breakpointObserver.observe(this.mediaQueries.map((item) => item.query)).pipe(
      map((result) => {
        const filteredQueries = this.mediaQueries.filter((mediaQuery) => result.breakpoints[mediaQuery.query]);
        return filteredQueries[filteredQueries.length - 1].viewport;
      })
    );
  }

  /**
   *
   * @param desiredViewport
   * @param viewports
   */
  private getClosestViewPort(desiredViewport: string, viewports: string[]) {
    if (viewports.indexOf(desiredViewport) > -1) {
      return desiredViewport;
    }
    switch (desiredViewport) {
      case 'xl':
        return this.getClosestViewPort('l', viewports);
      case 'l':
        return this.getClosestViewPort('m', viewports);
      case 'm':
        return this.getClosestViewPort('s', viewports);
      case 's':
        return this.getClosestViewPort('xs', viewports);
      case 'xs':
        return this.getClosestViewPort('xxs', viewports);
      default:
        return 'xxs';
    }
  }
}
