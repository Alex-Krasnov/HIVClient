import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EngineeringWorksComponent } from './engineering-works/engineering-works.component';



const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'main', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'err', component: EngineeringWorksComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
