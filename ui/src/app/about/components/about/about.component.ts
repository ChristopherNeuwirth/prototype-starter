import { Component, OnInit } from '@angular/core';
import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  constructor(private aboutService: AboutService) {}

  data = undefined;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.aboutService.getData().subscribe(
      (data) => (this.data = data),
      (error) => {
        this.data = { data: 'woops - ERROR' };
      }
    );
  }
}
