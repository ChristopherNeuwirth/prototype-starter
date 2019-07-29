import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  HostBinding,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  NgZone,
  OnChanges
} from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { InViewportDirective } from '@thisissoon/angular-inviewport';

import * as classes from '../shared/classes';
import * as events from '../shared/events';
import { ImageLoadedEvent } from '../shared/image-loaded-event.model';
import { Breakpoint } from '../shared/breakpoint.model';
import { ResponsiveImage, Size } from '../shared/image.model';

/**
 * A component that renders a `img` element with the correct image url
 * for the device size
 *
 * @example
 * ```html
 * <sn-image-loader
 *   [image]="image"
 *   [sizes]="sizes"
 *   imgClass="foo"
 *   (placeholderLoaded)="onPlaceholderLoad($event)"
 *   (imageLoaded)="onImageLoad($event)"
 *   alt="lorem ipsum">
 * </sn-image-loader>
 * ```
 * @dynamic
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sn-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss']
})
export class ImageLoaderComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  // URL of image for `img` element to display
  public src = '';
  // srcset string for `img` element
  public srcset = '';
  // Alt tag for image
  @Input() public alt = '';
  // Classes to pass on to image element
  @Input() public imgClass = '';
  // URL of image to preload using a dummy image element
  public preloadSrc = '';
  // srcset value of retina image to preload using a dummy image
  public preloadSrcset = '';
  // List of image breakpoints
  @Input()
  public sizes: Breakpoint[] = [
    { size: 'xs', width: 0 },
    { size: 'sm', width: 576 },
    { size: 'md', width: 768 },
    { size: 'lg', width: 992 },
    { size: 'xl', width: 1200 }
  ];
  // Current size of image to display
  public size: Size = 'xs';
  // Set of images for different viewports
  @Input() public image: ResponsiveImage;
  // If true means the element is inside the browser viewport
  public inViewport: boolean;
  // Amount of time to wait after last event
  public debounce = 100;
  //  Completes on component destroy lifecycle event use to handle unsubscription from infinite observables
  public ngUnsubscribe$ = new Subject<void>();
  // Reference to image element
  @ViewChild('img', { static: false }) public img: ElementRef;
  // Reference to instance of inViewport directive instance
  @ViewChild('snInViewport', { static: false }) public snInViewport: InViewportDirective;
  // If true it means the browser supports `srcset`
  public supportsSrcSet = false;
  // Output for placeholder image loaded event.
  @Output()
  public placeholderLoaded: EventEmitter<ImageLoadedEvent> = new EventEmitter<ImageLoadedEvent>();
  // Output for full res image loaded event.
  @Output()
  public imageLoaded: EventEmitter<ImageLoadedEvent> = new EventEmitter<ImageLoadedEvent>();
  // If true means the image has not been loaded yet and the placeholder image is currently displayed
  @HostBinding(classes.loadedClass) public loaded = false;
  // If true means the image has not been loaded yet and the placeholder image is currently displayed
  @HostBinding(classes.notLoadedClass)
  public get notLoaded(): boolean {
    return !this.loaded;
  }
  // Creates instance of component. Updates this.size based on window width.
  constructor(private ngZone: NgZone) {}

  // Set placeholder image as image on component init
  public ngOnInit(): void {
    this.onWidthChange(window.innerWidth);
    this.setPlaceholder();
  }
  // Subscribe to `resize` window event observable and run callback
  public ngAfterViewInit(): void {
    // Listen for window scroll/resize events.
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, events.eventResize)
        .pipe(
          takeUntil(this.ngUnsubscribe$),
          debounceTime(this.debounce)
        )
        // tslint:disable-next-line:no-any
        .subscribe((event: any) => this.ngZone.run(() => this.onWidthChange(event.target.innerWidth)));
    });
  }
  // If element is in viewport preload image by setting the src of the dummy image element.
  public onInViewportChange(inViewport: boolean): void {
    this.inViewport = inViewport;
    this.preloadImage();
  }
  // On width change, determine if device has changed and reset directive
  public onWidthChange(width: number): void {
    if (!this.sizes) {
      return;
    }
    const sizes = this.sizes.filter((size) => size.width <= width);
    const lastSize = sizes[sizes.length - 1];
    if (!this.size || this.size !== lastSize.size) {
      this.size = lastSize.size;
      this.setPlaceholder();
      this.preloadImage();
    }
  }
  // Set image to placeholder image
  public setPlaceholder(): void {
    this.loaded = false;
    this.src = this.image ? this.image.placeholder : this.src;
  }
  // Trigger image preload if element is within viewport and hasn't been preloaded
  public preloadImage(): void {
    if (this.inViewport && this.notLoaded) {
      if (!this.image) {
        return;
      }
      const retinaImg = this.image.images && this.image.images.find((retinaImage) => retinaImage.size === this.size);
      if (retinaImg) {
        const imageNormal = retinaImg.x1;
        const imageRetina = retinaImg.x2;
        if ('srcset' in this.img.nativeElement) {
          this.supportsSrcSet = true;
        }
        this.preloadSrcset = `${imageNormal} 1x, ${imageRetina} 2x`;
        this.preloadSrc = imageNormal;
      }
    }
  }
  //  When image has been preloaded set the src for the main `img` element to replace the placeholder
  public onImagePreload(): void {
    const retinaImg = this.image.images.find((retinaImage) => retinaImage.size === this.size);
    const imageNormal = retinaImg.x1;
    const imageRetina = retinaImg.x2;
    this.srcset = `${imageNormal} 1x, ${imageRetina} 2x`;
    this.src = imageNormal;
    this.preloadSrc = '';
    this.preloadSrcset = '';
    this.loaded = true;
  }

  public onImagePreloadError(): void {
    if (this.preloadSrc || this.preloadSrcset) {
      this.srcset = '';
      this.preloadSrc = '';
      this.preloadSrcset = '';
      this.src = this.image.fallback;
      this.loaded = true;
    }
  }
  // When the main `img` element has loaded
  public onImageLoad($event: Event): void {
    const eventData = {
      $event,
      src: this.src,
      srcset: this.srcset
    };
    if (!this.loaded) {
      this.placeholderLoaded.emit(eventData);
      return;
    }
    this.imageLoaded.emit(eventData);
  }
  // Trigger `ngUnsubscribe` complete on component destroy lifecycle hook
  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
  // Trigger image preload on changes. Prevents angular from reusing rendered image after changes.
  public ngOnChanges(): void {
    this.src = '';
    this.srcset = '';
    this.setPlaceholder();
    this.preloadImage();
  }
}
