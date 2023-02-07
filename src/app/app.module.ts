import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AuthGuard} from './guards/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { EngineeringWorksComponent } from './engineering-works/engineering-works.component';
import { LoginComponent } from './login/login.component';
import { JwtModule } from "@auth0/angular-jwt"; 
import { logOut } from './services/logout.service';
import { PatientCardModule } from './patient-card/patient-card.module';


export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EngineeringWorksComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    }),
    PatientCardModule
  ],
  providers: [
    AuthGuard,
    logOut
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
