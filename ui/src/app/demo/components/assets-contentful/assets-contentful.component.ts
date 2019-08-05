import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../services/contentful.service';

@Component({
  selector: 'app-assets-contentful',
  templateUrl: './assets-contentful.component.html',
  styleUrls: ['./assets-contentful.component.scss']
})
export class AssetsContentfulComponent implements OnInit {
  public image;
  public imageForLoader;

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit() {
    this.contentfulService.getResponsiveAssetForImageLoader('1Prri9wlSNuaml9m5TVmxI').then((providedAsset) => {
      this.imageForLoader = providedAsset;
      console.log(this.imageForLoader);
    });

    this.contentfulService.getResponsiveAsset('1Prri9wlSNuaml9m5TVmxI').then((providedAsset) => {
      this.image = providedAsset;
    });
  }

  clickFunction() {
    console.log('click');
  }
}
