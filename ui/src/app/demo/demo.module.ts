import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './components/demo/demo.component';
import { DemoRoutingModule } from './demo-routing.module';

// Demo
import { environment } from 'src/environments/environment';

import { ImageLoaderModule } from '../shared/image-loader/image-loader.module';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { MatInputModule, MatListModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';

import { DemoService } from './services/iTunes.service';
import { ContentfulService } from './services/contentful.service';

import { AsyncApiComponent } from './components/async-api/async-api.component';
import { AsyncApiObservableComponent } from './components/async-api-observable/async-api-observable.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AssetsStaticComponent } from './components/assets-static/assets-static.component';
import { AssetsContentfulComponent } from './components/assets-contentful/assets-contentful.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    DemoComponent,
    AsyncApiComponent,
    AsyncApiObservableComponent,
    AssetsStaticComponent,
    AssetsContentfulComponent,
    MapComponent
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
    FormsModule,
    ImageLoaderModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.MAPBOX_TOKEN
    })
  ]
})
export class DemoModule {}
