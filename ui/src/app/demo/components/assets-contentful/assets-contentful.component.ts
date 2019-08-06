import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../services/contentful.service';
import { ImageSkeletonService } from 'src/app/shared/image-loader/image-skeleton';
import { ImageUtils } from 'src/app/shared/image.utils';

@Component({
  selector: 'app-assets-contentful',
  templateUrl: './assets-contentful.component.html',
  styleUrls: ['./assets-contentful.component.scss']
})
export class AssetsContentfulComponent implements OnInit {
  public image;
  public imageForLoader;

  imageSkeleton = this.imageSkeletonService.getImageSkeletonSvgAsData();

  constructor(private contentfulService: ContentfulService, private imageSkeletonService: ImageSkeletonService) {}

  ngOnInit() {
    this.imageForLoader = ImageUtils.generateImageLoaderImageFromContentfulAsset(
      null,
      null,
      this.imageSkeleton,
      this.imageSkeleton
    );

    console.log(this.imageForLoader);

    this.contentfulService.getResponsiveAssetForImageLoader('1Prri9wlSNuaml9m5TVmxI').then((providedAsset) => {
      setTimeout(() => {
        this.imageForLoader = providedAsset;
        console.log(this.imageForLoader);
      }, 3000);
    });

    this.contentfulService.getResponsiveAsset('1Prri9wlSNuaml9m5TVmxI').then((providedAsset) => {
      setTimeout(() => {
        this.image = providedAsset;
      }, 3000);
    });
  }

  clickFunction() {
    console.log('click');
  }
}
