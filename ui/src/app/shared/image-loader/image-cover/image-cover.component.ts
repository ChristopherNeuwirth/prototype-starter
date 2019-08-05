import { Component, Input, HostBinding } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { isString } from 'lodash-es';

@Component({
  selector: `app-image-cover`,
  templateUrl: './image-cover.component.html',
  styleUrls: ['./image-cover.component.scss']
})
export class ImageCoverComponent {
  @Input() imageUrl: string | SafeUrl = '';
  @Input() gradient = false;
  @Input() gradientBanner = false;

  @HostBinding('class.image-cover') hostClass = true;
  @HostBinding('style.backgroundImage')
  get backgroundImage() {
    return isString(this.imageUrl) ? `url(${this.imageUrl})` : this.imageUrl;
  }
}
