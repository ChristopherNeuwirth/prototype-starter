import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InViewportModule } from '../in-viewport/in-viewport.module';

import { ImageLoaderComponent } from './image-loader/image-loader.component';
import { ImageCoverProgressiveComponent } from './image-cover-progressive/image-cover-progressive.component';
import { ImageCoverComponent } from './image-cover/image-cover.component';

/**
 * A simple progressive/responsive/lazy loading image library for
 * Angular that detects browser size and loads the appropriate
 * image only when the element is in view.
 * This package requires @thisissoon/angular-inviewport
 *
 */
@NgModule({
  imports: [CommonModule, InViewportModule],
  declarations: [ImageLoaderComponent, ImageCoverProgressiveComponent, ImageCoverComponent],
  exports: [ImageLoaderComponent, ImageCoverProgressiveComponent, ImageCoverComponent]
})
export class ImageLoaderModule {}
