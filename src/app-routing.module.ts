import { MapGuard } from './app/guards/map.guard';
import { MapComponent } from './app/components/map/map.component';
import { SocialauthComponent } from './app/components/socialauth/socialauth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app/components/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', },
  { path: 'login', component: SocialauthComponent},
  { path: 'map', component: MapComponent, canActivate: [MapGuard]},
  
]

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [ RouterModule.forRoot(routes) ],
  declarations: []
})
export class AppRoutingModule { }
