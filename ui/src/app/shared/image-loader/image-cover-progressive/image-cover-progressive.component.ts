import { Component, ChangeDetectionStrategy, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, scheduled, queueScheduler, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { SafeUrl } from '@angular/platform-browser';
import { ImageUtils } from '../../image.utils';
import { ImageSkeletonService } from '../image-skeleton';

@Component({
  selector: 'app-img-cov-prog',
  templateUrl: './image-cover-progressive.component.html',
  styleUrls: ['./image-cover-progressive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCoverProgressiveComponent implements OnInit, OnDestroy {
  @Input() gradient = false;
  @Input() gradientBanner = false;
  @Input() skeleton: string | SafeUrl = this.imageSkeletonService.getImageSkeletonSvgAsBackgroundImage();
  @Input()
  set image(value: string) {
    if (this.imageLoadedSubscription) {
      this.imageLoadedSubscription.unsubscribe();
    }
    this.image$ = ImageUtils.tryLoad(value, this.skeleton, true);
    this.imageLoaded$ = this.image$.pipe(map((imageValue) => imageValue === value));
    this.imageLoadedSubscription = this.imageLoaded$
      .pipe(filter((loaded) => loaded))
      .subscribe(() => this.imageLoaded.emit(value));
  }
  @Input()
  set placeholder(value: string) {
    if (this.placeholderLoadedSubscription) {
      this.placeholderLoadedSubscription.unsubscribe();
    }
    this.placeholder$ = ImageUtils.tryLoad(value, this.skeleton, true);
    this.placeholderLoaded$ = this.placeholder$.pipe(map((imageValue) => imageValue === value));
    this.placeholderLoadedSubscription = this.placeholderLoaded$
      .pipe(filter((loaded) => loaded))
      .subscribe(() => this.placeholderLoaded.emit(value));
  }
  @Output() imageLoaded: EventEmitter<string> = new EventEmitter();
  @Output() placeholderLoaded: EventEmitter<string> = new EventEmitter();

  image$: Observable<string>;
  imageLoaded$: Observable<boolean> = scheduled([false], queueScheduler);
  placeholder$: Observable<string | SafeUrl>;
  placeholderLoaded$: Observable<boolean> = scheduled([false], queueScheduler);
  private imageLoadedSubscription: Subscription;
  private placeholderLoadedSubscription: Subscription;

  constructor(private imageSkeletonService: ImageSkeletonService) {}

  ngOnInit(): void {
    if (!this.placeholder$) {
      this.placeholder$ = scheduled([this.skeleton], queueScheduler);
    }
  }

  ngOnDestroy(): void {
    if (this.imageLoadedSubscription) {
      this.imageLoadedSubscription.unsubscribe();
    }
    if (this.placeholderLoadedSubscription) {
      this.placeholderLoadedSubscription.unsubscribe();
    }
  }
}
