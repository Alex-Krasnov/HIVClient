import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthenticatedResponse } from './../_interfaces/authenticated-response.model';
import { LoginModel } from './../_interfaces/login.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  invalidLogin: boolean;
  credentials: LoginModel = {username:'', password:''};
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    
  }
  login = ( form: NgForm) => {
    if (form.valid) {
      // console.log(this.credentials);
      this.http.post<AuthenticatedResponse>("https://localhost:5001/Login", this.credentials, { 
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.token;
          localStorage.setItem("jwt", token); 
          this.invalidLogin = false; 
          console.log('1');
          this.router.navigate(["main"]);
          console.log('2');
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      })
    }
  }
}
