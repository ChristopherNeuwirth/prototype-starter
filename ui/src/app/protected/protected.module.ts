import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedComponent } from './components/protected/protected.component';
import { ProtectedRoutingModule } from './protected-routing.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../core/auth.service';
import { AuthInterceptorService } from '../core/auth.interceptor.service';

@NgModule({
  declarations: [ProtectedComponent],
  imports: [CommonModule, ProtectedRoutingModule, HttpClientModule],
  providers: [AuthService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }]
})
export class ProtectedModule {}
