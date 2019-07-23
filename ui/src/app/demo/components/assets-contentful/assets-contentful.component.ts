import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../services/contentful.service';

@Component({
  selector: 'app-assets-contentful',
  templateUrl: './assets-contentful.component.html',
  styleUrls: ['./assets-contentful.component.scss']
})
export class AssetsContentfulComponent implements OnInit {
  public image;

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit() {
    this.contentfulService
      .getResponsiveAsset('1Prri9wlSNuaml9m5TVmxI')
      .then((providedAsset) => (this.image = providedAsset));
  }
}
