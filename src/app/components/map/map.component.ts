import { Point,BoundsMap, PointGeometry } from './../../model/point';
import { OperationsService } from './../../services/operations.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

declare let L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title = 'app';
  latitude;
  longitude;
  id: Observable<string>;
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
  markersCount = 0;
  
  constructor(private location: Location,
              private auth: AuthenticationService,
              private route:  ActivatedRoute,
              private router: Router,
              private operations: OperationsService,
              private zone: NgZone,
              public snackBar: MatSnackBar) {             
                              
               this.drawPoints();
              }

  ngOnInit() {
        this.zone.runOutsideAngular(() => {
          this.getGeoLocation();
          this.map = L.map('map').fitWorld();
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);

          this.addListenersEvent();    
        });

        this.auth.login();        
        let _id;

        this.route.paramMap.subscribe(params=>{
          localStorage.setItem('id',params.get('id'));          
        }); 
  }

  private addListenersEvent(){
    this.map.locate({setView: true, maxZoom: 16})
        .on('locationfound', (e) => {
          this.onLocationFound(e);
        });

        this.map.on('locationerror', (e) => {
          this.onLocationError(e);
        });       

        this.map.on('moveend',(e)=>{
          this.gettingBounds(e);
        });

        this.map.on('click', (e) => {
          this.onClickMap(e);
        });
  }

  

  gettingBounds(e){
    this.zone.run(()=>{
      let southWest: PointGeometry = this.map.getBounds().getSouthWest();
      let southEast: PointGeometry = this.map.getBounds().getSouthEast();
      let northWest: PointGeometry = this.map.getBounds().getNorthWest();
      let northEast: PointGeometry = this.map.getBounds().getNorthEast();
      let bounds = [southWest, southEast, northEast, northWest];
      let boundsMap: BoundsMap = {
        geometry : {
          type : 'Polygon',
          coordinates : [[southWest.lng, southWest.lat],
                         [southEast.lng, southEast.lat],
                         [northEast.lng, northEast.lat],
                         [northWest.lng, northWest.lat]
                         ]
        }
      }  
    });

  }

  onLocationFound(e) {
    const marker1 = L.marker([e.latitude, e.longitude], { icon: this.myIcon});   
    marker1.addTo(this.map);
    this.map.setZoom(16);    
}

onLocationError(e) {
  console.log(e.message);
}

onClickMap(e) {  
  this.markersCount++;
  const marker1 = L.marker([e.latlng.lat, e.latlng.lng], { icon: this.IconDanger});
  var popup = L.popup()
    .setLatLng(e.latlng)
    .setContent('<p><input type="text" id="message'+this.markersCount.toString()+'"/> <button id="sendlocation'+this.markersCount.toString()+'">Send </button></p>')
  
  marker1.bindPopup(popup);
  marker1.addTo(this.map).openPopup();

let button : HTMLElement = document.getElementById('sendlocation'+this.markersCount.toString()) as HTMLElement;
  
button.onclick = ()=>{                    
                    let message : HTMLInputElement = document.getElementById('message'+this.markersCount.toString()) as HTMLInputElement;  
                    let comment  = message.value;  
                    this.savePointInDB(e.latlng.lat,e.latlng.lng ,comment);
                    marker1.closePopup();
                  }

}

savePointInDB(lat, lng,comment){ 
  let newPoint: Point = {
                user_id : localStorage.getItem("id"),
                comment: comment,
                date: new Date(),
                  location: {      
                        type:'Point',
                        lat: lat,
                        lng: lng        
                  }
                } 
 
  this.operations.addPoint(newPoint).subscribe(res=>{
    this.openSnackBar("Your report has been saved",""); 
   
  });  
}

drawPoints(){
  this.operations.getAllPoints().subscribe(points=>{
    points.forEach((item)=>{         
      var pointer = L.latLng(item.location.lat, item.location.lng);
     const marker = L.marker([pointer.lat, pointer.lng], { icon: this.IconDanger});
     var popup = L.popup()    
       .setContent('<div class="alert alert-primary" role="alert"><strong>'+new Date(item.date).toLocaleDateString()+'</strong><br>'+item.comment+'</div>'
       )
     
     marker.bindPopup(popup);
     marker.addTo(this.map);
    });    
  });
}

getGeoLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.SetLocation(position);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

SetLocation(position){
  this.latitude = position.coords.latitude;
  this.longitude = position.coords.longitude;
}

ErrorLocation(){
  this.openSnackBar("Error trying to get coords","undo")
}

openSnackBar(message: string, action: string) {
    this.snackBar.open(message, "", {
      duration: 2000,
    });
}


}
