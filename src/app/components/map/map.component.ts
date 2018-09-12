import { Point } from './../../model/point';
import { OperationsService } from './../../services/operations.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ListenerObject } from '../../Helper/eventchange';

declare let L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title = 'app';
  latitude = 3.401769;
  longitude = -76.539840;
  id: number;
  ec: any;
  email: string;  
  myIcon = L.icon({
    iconUrl: 'assets/leaflet/images/marker-icon.png',
    shadowUrl: '../assets/leaflet/images/marker-shadow.png'
  });

  IconDanger = L.icon({
    iconUrl: 'assets/leaflet/images/pirates.png',
    shadowUrl: '../assets/leaflet/images/marker-shadow.png'
  });
  
  map;
  
  constructor(private location: Location,
              private auth: AuthenticationService,
              private route:  ActivatedRoute,
              private operations: OperationsService) {
               this.getUser();
                
              }

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

        this.auth.login();        
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
  let count = 1;
  const marker1 = L.marker([e.latlng.lat, e.latlng.lng], { icon: this.IconDanger});
  var popup = L.popup()
    .setLatLng(e.latlng)
    .setContent('<p><input type="text" id="message"/> <button id="sendlocation">Send </button></p>')
  
  marker1.bindPopup(popup);
  marker1.addTo(this.map).openPopup();

let button : HTMLElement = document.getElementById('sendlocation') as HTMLElement;
  
button.onclick = ()=>{
                    console.log('test');
                    let message : HTMLInputElement = document.getElementById('message') as HTMLInputElement;  
                    let comment  = message.value;  
                    this.savePointInDB(marker1 ,comment);
                    button.hidden = true;
                  }

}

sendDataMarker() {  
 
  let message : HTMLInputElement = document.getElementById('message') as HTMLInputElement;  
  let comment  = message.value;  
  this.savePointInDB(this.ec.getMarker() ,comment);
}

savePointInDB(marker,comment){
  let newPoint: Point = {
    user_id : this.id.toString(),
    comment: comment,
    geolocation: marker.toGeoJSON()
  }
 console.log(newPoint);
  this.operations.addPoint(newPoint).subscribe(res=>{
    console.log(res);
    
  })
  
}

getPoints(){
  
}

getUser(){
  this.id = +this.route.snapshot.paramMap.get('id');
    
  if (this.id != null) {
      localStorage.setItem('id', JSON.stringify(this.id));
    }else{
      this.id = JSON.parse(localStorage.getItem('id'));
    }
}


}
