import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { logOut } from '../services/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  customers: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private logout: logOut, private router: Router){  }

  ngOnInit() { 
    console.log(this.jwtHelper.getTokenExpirationDate(localStorage.getItem("jwt")));
    console.log(this.jwtHelper.decodeToken(localStorage.getItem("jwt")));
  }  

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;      
    }
    return false;
  }

  roles(){
    localStorage.getItem("jwt");

  }

  exit(){
    this.logout.revokeToken();
    this.router.navigate([""]);
  }
}
