import { MapComponent } from './app/components/map/map.component';
import { SocialauthComponent } from './app/components/socialauth/socialauth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'login', component: SocialauthComponent},
  { path: 'map', component: MapComponent},
  { path: '', component: MapComponent}
]

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [ RouterModule.forRoot(routes) ],
  declarations: []
})
export class AppRoutingModule { }
