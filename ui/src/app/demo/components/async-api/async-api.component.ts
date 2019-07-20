import { Component, OnInit } from '@angular/core';
import { DemoService } from '../../services/iTunes.service';
import { SearchItem } from '../../models/SearchItem';

@Component({
  selector: 'app-async-api',
  templateUrl: './async-api.component.html',
  styleUrls: ['./async-api.component.scss']
})
export class AsyncApiComponent implements OnInit {
  loading: boolean;

  constructor(public iTunes: DemoService) {
    this.loading = false;
  }

  ngOnInit() {}

  doSearch(term: string) {
    this.loading = true;
    this.iTunes.search(term).then(() => (this.loading = false));
  }
}
