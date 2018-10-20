import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-socialauth',
  templateUrl: './socialauth.component.html',
  styleUrls: ['./socialauth.component.css']
})
export class SocialauthComponent implements OnInit {

  constructor(private router: Router,
              private auth: AuthenticationService) { }

  ngOnInit() {
  }

  login(){    
    window.location.href = 'auth/google';
  }
  

}
