import { Injectable } from '@angular/core';
import { createClient } from 'contentful';
import { environment } from 'src/environments/environment';

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
        return {
          defaultImage: res.fields.file.url,
          responsiveSet: `${res.fields.file.url}?w=480  480w,
                          ${res.fields.file.url}?w=1920 1920w`
        };
      })
      .catch((error) => console.log(error));
  }
}
