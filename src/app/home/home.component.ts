import { Component, OnInit} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { logOut } from '../services/logout.service';
import { Router } from '@angular/router';
import { NewPatientService } from '../services/new-patient.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  customers: any;
  isKlassif:boolean = false;
  isAdmin:boolean = false;
  isWriter:boolean = false;
  //roles:string[];

  constructor(
    private jwtHelper: JwtHelperService, 
    private logout: logOut, 
    private router: Router,
    private service: NewPatientService
    ){  }

  ngOnInit() { 
    console.log(this.jwtHelper.decodeToken(localStorage.getItem("jwt")));
    var roles = this.jwtHelper.decodeToken(localStorage.getItem("jwt"))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    console.log(this.jwtHelper.getTokenExpirationDate(localStorage.getItem("jwt")));
    
    if(roles.find(e => e == "Klassif") != null)
      this.isKlassif = true;
    if(roles.find(e => e == "Admin") != null)
      this.isAdmin = true;
    if(roles.find(e => e == "Writer") != null)
      this.isWriter = true;

    console.log(this.isWriter, "isWriter",this.isKlassif, "isKlassif",this.isAdmin, "isAdmin");
  }  

  async newPatient(){
    let id = await firstValueFrom(this.service.getData()).then()
    this.router.navigate(["/patient_card/main/"+id])
  }

  exit(){
    this.logout.revokeToken();
    this.router.navigate([""]);
  }
}
