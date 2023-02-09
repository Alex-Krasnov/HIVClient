import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { PatientCardMainComponent } from './patient-card-main/patient-card-main.component';

const routes: Routes = [
  { path: 'main/:id', component: PatientCardMainComponent }//,
  //{ path: ':id', component: ItemsDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientCardRoutingModule {}
