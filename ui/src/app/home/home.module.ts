import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatInputModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';
import { HomeService } from './services/home.service';

@NgModule({
  declarations: [HomeComponent],
  providers: [HomeService],
  imports: [CommonModule, HomeRoutingModule, MatInputModule, MatListModule, MatProgressSpinnerModule]
})
export class HomeModule {}
