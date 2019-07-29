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
        return {
          imageLoader: ImageUtils.generateImageLoaderImageFromContentfulAsset(
            res.fields.file.url,
            MediaType.IMAGE_JPEG
          ),
          src: res.fields.file.url,
          srcSet
        };
      })
      .catch((error) => console.log(error));
  }
}
