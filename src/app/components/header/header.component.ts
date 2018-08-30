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

  constructor(private router: Router,
              private auth: AuthenticationService) { }

  ngOnInit() {
    
  }  

  clickLogin(){
    this.router.navigateByUrl('/login');
    this.auth.login();
  }

  clickLogout(){
    console.log('d')    
    window.localStorage.removeItem('id');
    this.router.navigateByUrl('/');
    this.auth.logout();
  }

}
