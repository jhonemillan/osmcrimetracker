import { MapGuard } from './app/guards/map.guard';
import { MapComponent } from './app/components/map/map.component';
import { SocialauthComponent } from './app/components/socialauth/socialauth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app/components/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: SocialauthComponent, pathMatch: 'full'},  
  { path: 'map', component: MapComponent, pathMatch: 'full'},
  { path: 'map/:id', component: MapComponent, pathMatch: 'full'},
  
]

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [ RouterModule.forRoot(routes) ],
  declarations: []
})
export class AppRoutingModule { }
