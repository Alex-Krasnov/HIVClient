import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'main', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'patient_card', 
  loadChildren: () => import('./patient-card/patient-card.module').then(m => m.PatientCardModule), 
  canActivate: [AuthGuard]},
  { path: 'search', 
  loadChildren: () => import('./search/search.module').then(m => m.SearchModule), 
  canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
