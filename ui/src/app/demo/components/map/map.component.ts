import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public map: Map;
  public accessToken = environment.MAPBOX_TOKEN;
  public style = 'mapbox://styles/capbb/cjy9wgiah0cf21cqx1c24v65e';

  public center = [10.70594, 45.576926];

  constructor() {}

  ngOnInit() {}

  alert(term) {
    console.log(term);
  }
}
