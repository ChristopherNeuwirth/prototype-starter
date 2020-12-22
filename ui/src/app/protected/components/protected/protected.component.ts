import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit {
  public message;
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getMessage();
  }

  async getMessage() {
    return this.httpClient.get(`${environment.API_BASE_URL}/secure`).subscribe((data) => (this.message = data));
  }
}
