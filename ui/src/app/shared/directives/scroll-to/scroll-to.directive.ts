import { Directive, Inject, HostListener, Input } from '@angular/core';
import { WINDOW } from '../../window/window.provider';

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective {
  private topPosition: number | string = 0;

  @Input()
  set appScrollTo(pos) {
    this.topPosition = pos;
  }

  constructor(@Inject(WINDOW) private window: Window) {}

  @HostListener('click', ['$event.target'])
  onClick() {
    if (typeof this.topPosition === 'number') {
      this.window.scroll({
        top: this.topPosition,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      const selectorElem = this.window.document.querySelector(this.topPosition);
      if (selectorElem) {
        selectorElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
