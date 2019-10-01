import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToDirective } from './scroll-to/scroll-to.directive';

const directives = [ScrollToDirective];

@NgModule({
  imports: [CommonModule],
  declarations: directives,
  exports: directives
})
export class SharedDirectivesModule {}
