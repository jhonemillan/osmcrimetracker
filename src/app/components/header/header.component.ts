import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  enabled;
  constructor(private router: Router,
              private auth: AuthenticationService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.auth.isLoggedIn;
    this.isLoggedIn$.subscribe((data)=>{
      this.enabled = data;
      console.log('result', data);
    })
  }  

  clickLogin(){
    
    this.router.navigateByUrl('/login');
  }

  clickLogout(){    
    window.localStorage.removeItem('id');
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

}
