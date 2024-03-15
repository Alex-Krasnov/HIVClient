import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ImportKorvetComponent } from './import-korvet/import-korvet.component';
import { SerchRegistryComponent } from './serch-registry/serch-registry.component';



const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'main', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'patient_card', 
  loadChildren: () => import('./patient-card/patient-card.module').then(m => m.PatientCardModule), 
  canActivate: [AuthGuard]},
  { path: 'search', 
  loadChildren: () => import('./search/search.module').then(m => m.SearchModule), 
  canActivate: [AuthGuard]},
  { path: 'visit', 
  loadChildren: () => import('./visit/visit.module').then(m => m.VisitModule), 
  canActivate: [AuthGuard]},
  { path: 'imp-korvet', component: ImportKorvetComponent, canActivate: [AuthGuard]},
  { path: 'search-registry', component: SerchRegistryComponent, canActivate: [AuthGuard]},
  { path: 'lists', 
  loadChildren: () => import('./lists/lists.module').then(m => m.ListsModule), 
  canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
