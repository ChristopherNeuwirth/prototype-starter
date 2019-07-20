import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './components/demo/demo.component';
import { DemoRoutingModule } from './demo-routing.module';

// Demo
import { AsyncApiComponent } from './components/async-api/async-api.component';
import { MatInputModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';
import { DemoService } from './services/iTunes.service';

@NgModule({
  declarations: [DemoComponent, AsyncApiComponent],
  providers: [DemoService],
  imports: [CommonModule, DemoRoutingModule, MatInputModule, MatListModule, MatProgressSpinnerModule]
})
export class DemoModule {}
