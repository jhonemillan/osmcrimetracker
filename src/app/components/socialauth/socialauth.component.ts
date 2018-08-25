import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-socialauth',
  templateUrl: './socialauth.component.html',
  styleUrls: ['./socialauth.component.css']
})
export class SocialauthComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(){
    //this.router.navigate(['http://localhost:3000/auth/google']);
    window.location.href = 'http://localhost:3000/auth/google';
  }
  

}
