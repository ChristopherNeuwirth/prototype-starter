import { Injectable } from '@angular/core';
import { imageSkeletonSVG } from './image-skeleton.svg';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageSkeletonService {
  constructor(private sanatizer: DomSanitizer) {}

  public getImageSkeletonSvgAsData(withIcon?: boolean, iconColor?: string, backgroundColor?: string) {
    return this.sanatizer.bypassSecurityTrustUrl(imageSkeletonSVG(withIcon, iconColor, backgroundColor));
  }

  public getImageSkeletonSvgAsBackgroundImage(withIcon?: boolean, iconColor?: string, backgroundColor?: string) {
    return this.sanatizer.bypassSecurityTrustStyle(`url(${imageSkeletonSVG(withIcon, iconColor, backgroundColor)})`);
  }
}
