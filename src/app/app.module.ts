import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {AuthGuard} from './guards/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { JwtModule } from "@auth0/angular-jwt"; 
import { logOut } from './services/logout.service';
import { PatientCardModule } from './patient-card/patient-card.module';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { VisitModule } from './visit/visit.module';
import { ImportKorvetComponent } from './import-korvet/import-korvet.component';
import { SerchRegistryComponent } from './serch-registry/serch-registry.component';


export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ImportKorvetComponent,
    SerchRegistryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    }),
    PatientCardModule,
    VisitModule
  ],
  providers: [
    AuthGuard,
    logOut,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
