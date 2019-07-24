import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

/**
 * TARGET Load image
 * when in Viewport
 * with src and srcset (different sizes from contentful )
 * classes can be overgiven
 * shows loader while loading
 * can decied if as background image or normal image
 *
 * @example
 * ```html
 * <app-image-loader
 *   [image]="image"
 *   [sizes]="sizes"
 *   imgClass="foo"
 *   (placeholderLoaded)="onPlaceholderLoad($event)"
 *   (imageLoaded)="onImageLoad($event)"
 *   alt="lorem ipsum">
 * </app-image-loader>
 * ```
 */
@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss']
})
export class ImageLoaderComponent implements OnInit {
  @Input() public image;

  @ViewChild('img', { static: false }) public img: ElementRef;

  constructor() {}

  ngOnInit() {}
}
