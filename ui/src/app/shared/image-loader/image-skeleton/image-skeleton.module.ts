import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSkeletonService } from './image-skeleton.service';

@NgModule({
  imports: [CommonModule],
  providers: [ImageSkeletonService]
})
export class ImageSkeletonModule {}
