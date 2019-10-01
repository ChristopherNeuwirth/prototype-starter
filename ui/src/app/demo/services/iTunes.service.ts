import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchItem } from '../models/SearchItem';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// This Service is a demo service for the async and observable API call
export class DemoService {
  apiRoot = 'https://itunes.apple.com/search';
  results: SearchItem[];

  constructor(private http: HttpClient) {
    this.results = [];
  }

  search(term: string) {
    const promise = new Promise((resolve, reject) => {
      const apiUrl = `${this.apiRoot}?term=${term}&media=music&limit=20`;
      this.http
        .get(apiUrl)
        .toPromise()
        .then((res: any) => {
          console.log(res.results);
          this.results = res.results.map((item) => {
            return {
              title: item.trackName,
              artistName: item.artistName,
              thumbnail: item.artworkUrl30,
              artistId: item.artistId
            };
          });
          resolve();
        })
        .catch((rej) => {
          console.error(rej);
        });
    });
    return promise;
  }

  searchByObservable(term: string): Observable<SearchItem[]> {
    const apiUrl = `${this.apiRoot}?term=${term}&media=music&limit=20`;
    console.log(term);
    return this.http.get<SearchItem[]>(apiUrl).pipe(
      tap((data) => console.log('Response: ', data)),
      map((res: any) => {
        return res.results.map(
          (item) =>
            ({
              title: item.trackName,
              artistName: item.artistName,
              thumbnail: item.artworkUrl30,
              artistId: item.artistId
            } as SearchItem)
        );
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
