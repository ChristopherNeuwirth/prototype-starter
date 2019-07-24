import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageLoaderComponent } from './component/image-loader.component';

@NgModule({
  declarations: [ImageLoaderComponent],
  imports: [CommonModule],
  exports: [ImageLoaderComponent]
})
export class ImageLoaderModule {}
