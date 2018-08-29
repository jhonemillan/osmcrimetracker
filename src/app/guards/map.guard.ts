import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapGuard implements CanActivate {

  constructor(private router: Router){
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (localStorage.getItem('gId')) {
        return true;
      }

      this.router.navigate(['/home'],{ queryParams: { returnUrl: state.url}}); 
      return false;
  }
}
