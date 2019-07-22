import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './components/demo/demo.component';
import { DemoRoutingModule } from './demo-routing.module';

// Demo
import { AsyncApiComponent } from './components/async-api/async-api.component';
import { MatInputModule, MatListModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';
import { DemoService } from './services/iTunes.service';
import { AsyncApiObservableComponent } from './components/async-api-observable/async-api-observable.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DemoComponent, AsyncApiComponent, AsyncApiObservableComponent],
  providers: [DemoService],
  imports: [
    CommonModule,
    DemoRoutingModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DemoModule {}
