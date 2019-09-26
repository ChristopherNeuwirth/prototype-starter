import { Injectable } from '@angular/core';
import { createClient } from 'contentful';
import { environment } from 'src/environments/environment';
import { ImageUtils } from 'src/app/shared/image.utils';
import { MediaType } from 'src/app/shared/media-type';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private client = createClient({
    space: environment.CONTENTFUL_SPACE,
    accessToken: environment.CONTENTFUL_TOKEN
  });

  constructor() {}

  getResponsiveAsset(assetId: string) {
    return this.client
      .getAsset(assetId)
      .then((res: any) => {
        const srcSet = ImageUtils.generateSrcset(res.fields.file.url);

        return {
          src: res.fields.file.url,
          srcSet
        };
      })
      .catch((error) => console.log(error));
  }

  getResponsiveAssetForImageLoader(assetId: string) {
    return this.client
      .getAsset(assetId)
      .then((res: any) => {
        const srcSet = ImageUtils.generateSrcset(res.fields.file.url);
        let imageData: { [k: string]: any } = {};
        imageData = ImageUtils.generateImageLoaderImageFromContentfulAsset(
          res.fields.file.url,
          MediaType.IMAGE_JPEG,
          `${res.fields.file.url}?w=100&fit=fill`
        );
        imageData.src = res.fields.file.url;
        imageData.srcSet = srcSet;
        return imageData;
      })
      .catch((error) => console.log(error));
  }

  getResponsiveAssetForProgressiveImageCover(assetId: string) {
    return this.client
      .getAsset(assetId)
      .then((res: any) => {
        // what i want
        // Skeleton -> Placeholder -> Image
        // Load when close to Viewport
        // Have a Object in place which holds the urls for Retina Normal and Mobile Desktop image URLs
        // Decide by Breakpoint Observer which image to load
      })
      .catch((error) => console.log(error));
  }
}
