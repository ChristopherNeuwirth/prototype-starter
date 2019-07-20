import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { SearchItem } from '../../models/SearchItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading: boolean;

  constructor(public iTunes: HomeService) {
    this.loading = false;
  }

  ngOnInit() {}

  doSearch(term: string) {
    this.loading = true;
    this.iTunes.search(term).then(() => (this.loading = false));
  }
}
