import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchItem } from '../models/SearchItem';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
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
}
