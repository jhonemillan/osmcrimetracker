import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';


declare let L;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  latitude = 3.401769;
  longitude = -76.539840;
  myIcon = L.icon({
    iconUrl: 'assets/leaflet/images/marker-icon.png',
    shadowUrl: '../assets/leaflet/images/marker-shadow.png'
  });
  map;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {

     this.map = L.map('map').fitWorld();

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        this.map.locate({setView: true, maxZoom: 16})
        .on('locationfound', (e) => {
          this.onLocationFound(e);
        });

        this.map.on('locationerror', (e) => {
          this.onLocationError(e);
        });

        this.map.on('click', (e) => {
          this.onClickMap(e);
        });
  }

  onLocationFound(e) {
    const marker1 = L.marker([e.latitude, e.longitude], { icon: this.myIcon});
    marker1.addTo(this.map);
    this.map.setZoom(16);
    console.log('se agrego el marker', e);
}

onLocationError(e) {
  console.log(e.message);
}

onClickMap(e) {
  const marker1 = L.marker([e.latlng.lat, e.latlng.lng], { icon: this.myIcon});
  marker1.addTo(this.map);
  console.log('clic', e.latlng);
}

}
