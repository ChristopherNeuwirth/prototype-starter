import { Observable } from 'rxjs';
import { Breakpoint, ResponsiveImage } from '@thisissoon/angular-image-loader';
import { SafeUrl } from '@angular/platform-browser';
import { IfStmt } from '@angular/compiler';

export enum MediaType {
  AUDIO_MPEG = 'audio/mpeg',
  IMAGE_JPEG = 'image/jpeg',
  IMAGE_PNG = 'image/png'
}

const webP = new Image();
let isWebPSupported = false;
webP.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wA  iMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';
webP.onload = webP.onerror = () => {
  isWebPSupported = webP.height === 2;
};

export class ImageUtils {
  static get contentfulImageFormat() {
    return `fm=${isWebPSupported ? 'webp' : 'png'}`;
  }

  public static generateImageLoaderImageFromContentfulAsset(
    imageUrl: string,
    imageType: MediaType,
    placeholder?: string | SafeUrl,
    fallback?: string | SafeUrl,
    quality?: number,
    sizes: Breakpoint[] = [
      { size: 'xs', width: 0 },
      { size: 'sm', width: 660 },
      { size: 'md', width: 1200 },
      { size: 'lg', width: 1600 }
    ]
  ): ImageLoaderImageData {
    let imageQuality = quality;
    if (imageQuality === undefined || imageQuality === null) {
      if (imageType !== null && imageType !== undefined && imageType.toLowerCase() === 'image/jpeg') {
        imageQuality = 80;
      }
      if (imageType !== null && imageType !== undefined && imageType.toLowerCase() === 'image/png') {
        imageQuality = 90;
      }
    }

    const images = imageUrl
      ? sizes.map((size) => {
          // NOTE: take 660 in contentful width for xs
          let imageWidth = size.width;
          if (imageWidth === 0) {
            const sizeSm = sizes.find((s) => s.size === 'sm');
            imageWidth = !!sizeSm ? sizeSm.width : imageWidth;
          }
          return {
            size: size.size,
            x1: `${imageUrl}?w=${imageWidth}&q=${imageQuality}&${this.contentfulImageFormat}`,
            x2: `${imageUrl}?w=${imageWidth * 2}&q=${imageQuality}&${this.contentfulImageFormat}`
          };
        })
      : [];

    if (!placeholder) {
      placeholder = '';
    }

    return {
      sizes,
      image: {
        images,
        placeholder: placeholder as string,
        fallback: fallback as string
      }
    };
  }

  public static generateImageLoaderImage(
    imageUrl: string,
    placeholder?: string | SafeUrl,
    fallback?: string | SafeUrl,
    sizes: Breakpoint[] = [
      { size: 'xs', width: 0 },
      { size: 'sm', width: 660 },
      { size: 'md', width: 1200 },
      { size: 'lg', width: 1600 }
    ]
  ) {
    const images = imageUrl
      ? sizes.map((size) => {
          return {
            size: size.size,
            x1: imageUrl,
            x2: imageUrl
          };
        })
      : [];

    return {
      sizes,
      image: {
        images,
        placeholder: placeholder as string,
        fallback: fallback as string
      }
    };
  }

  // Generates source set with default sizes or custom sizes.
  // Default sizes are fitting for fullscreen images due to standard breakpoints.
  // Function is using the contentful api parameter for progessive image loading.
  public static generateSrcset(imageUrl: string, sizes: Number[] = [660, 1200, 1600]) {
    return sizes
      .map((size) => {
        return `${imageUrl}?w=${size}&${this.contentfulImageFormat} ${size}w`;
      })
      .join(',');
  }

  /**
   * Function to test if a image can be loaded. The returned url can directly
   * be used in the ui since the ressource exists and is accessible.
   * @param url The ressource that should be tested.
   * @param fallbackUrl Fallback in case the first ressource cannot be loaded.
   * @param initializeWithFallback The returned observable emits fallbackUrl as first value.
   */
  public static tryLoad(url: string, fallbackUrl?: string | SafeUrl, initializeWithFallback = false) {
    return new Observable<string>((observer) => {
      if (initializeWithFallback) {
        observer.next(fallbackUrl as string);
      }

      const img = new Image();
      img.onload = () => {
        observer.next(url);
        observer.complete();
      };
      img.onerror = () => {
        if (!initializeWithFallback) {
          observer.next(fallbackUrl as string);
        }
        observer.complete();
      };
      if (url !== null && url !== undefined) {
        img.src = url;
      } else {
        observer.next(fallbackUrl as string);
        observer.complete();
      }
    });
  }
}

export interface ImageLoaderImageData {
  image: ResponsiveImage;
  sizes: Breakpoint[];
}
