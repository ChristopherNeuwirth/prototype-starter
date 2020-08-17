import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedComponent } from './components/protected/protected.component';
import { ProtectedRoutingModule } from './protected-routing.module';

@NgModule({
  declarations: [ProtectedComponent],
  imports: [CommonModule, ProtectedRoutingModule]
})
export class ProtectedModule {}
