import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AboutService {
  constructor(private http: HttpClient) {}

  url = `${environment.API_BASE_URL}/hello`;

  getData() {
    return this.http.get(this.url);
  }
}
