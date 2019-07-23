import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './components/demo/demo.component';
import { DemoRoutingModule } from './demo-routing.module';

// Demo
import { MatInputModule, MatListModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';

import { DemoService } from './services/iTunes.service';
import { ContentfulService } from './services/contentful.service';

import { AsyncApiComponent } from './components/async-api/async-api.component';
import { AsyncApiObservableComponent } from './components/async-api-observable/async-api-observable.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AssetsStaticComponent } from './components/assets-static/assets-static.component';
import { AssetsContentfulComponent } from './components/assets-contentful/assets-contentful.component';

@NgModule({
  declarations: [
    DemoComponent,
    AsyncApiComponent,
    AsyncApiObservableComponent,
    AssetsStaticComponent,
    AssetsContentfulComponent
  ],
  providers: [DemoService, ContentfulService],
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
