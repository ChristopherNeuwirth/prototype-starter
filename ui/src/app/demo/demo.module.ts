import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './components/demo/demo.component';
import { DemoRoutingModule } from './demo-routing.module';

// Demo
import { environment } from 'src/environments/environment';

import { ImageLoaderModule } from '../shared/image-loader/image-loader.module';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DemoService } from './services/iTunes.service';
import { ContentfulService } from './services/contentful.service';

import { AsyncApiComponent } from './components/async-api/async-api.component';
import { AsyncApiObservableComponent } from './components/async-api-observable/async-api-observable.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AssetsStaticComponent } from './components/assets-static/assets-static.component';
import { AssetsContentfulComponent } from './components/assets-contentful/assets-contentful.component';
import { MapComponent } from './components/map/map.component';

import { SharedDirectivesModule } from '../shared/directives/shared-directives.module';
import { windowProviders } from '../shared/window/window.provider';

@NgModule({
  declarations: [
    DemoComponent,
    AsyncApiComponent,
    AsyncApiObservableComponent,
    AssetsStaticComponent,
    AssetsContentfulComponent,
    MapComponent
  ],
  providers: [DemoService, ContentfulService, windowProviders],
  imports: [
    CommonModule,
    DemoRoutingModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    ImageLoaderModule,
    SharedDirectivesModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.MAPBOX_TOKEN
    })
  ],
  exports: [SharedDirectivesModule]
})
export class DemoModule {}
