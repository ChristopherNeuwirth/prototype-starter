import { Component, OnInit, OnDestroy } from '@angular/core';
import { DemoService } from '../../services/iTunes.service';
import { Observable, ReplaySubject, Subject, combineLatest } from 'rxjs';
import { SearchItem } from '../../models/SearchItem';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, distinctUntilChanged, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-async-api-observable',
  templateUrl: './async-api-observable.component.html',
  styleUrls: ['./async-api-observable.component.scss']
})
export class AsyncApiObservableComponent implements OnInit, OnDestroy {
  public loading: boolean;
  // public results$: Observable<SearchItem[]>;
  public results: SearchItem[] = [];
  public searchField: FormControl;

  constructor(private iTunes: DemoService) {
    this.loading = false;
  }

  ngOnInit() {
    this.searchField = new FormControl();
    // this.results$ = this.searchField.valueChanges.pipe(
    //   debounceTime(400),
    //   distinctUntilChanged(),
    //   // tap(() => {
    //   //   this.loading = true;
    //   //   console.log('started', this.loading);
    //   //   // with async it does not resolve
    //   // }),
    //   switchMap((term) => this.iTunes.searchByObservable(term)),
    //   tap(() => {
    //     this.loading = false;
    //     console.log('resolved', this.loading);
    //   })
    // );

    this.searchField.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        switchMap((term) => this.iTunes.searchByObservable(term)),
        tap(() => (this.loading = false))
      )
      .subscribe((items) => {
        this.results = items;
      });
  }

  ngOnDestroy() {
    // unsubscribe from Subscription?
  }
}
