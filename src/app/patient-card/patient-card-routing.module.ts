import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { PatientCardMainComponent } from './patient-card-main/patient-card-main.component';
import { PatientCardTreatmentComponent } from './patient-card-treatment/patient-card-treatment.component';
import { PatientCardEpidComponent } from './patient-card-epid/patient-card-epid.component';

const routes: Routes = [
  { path: 'main/:id', component: PatientCardMainComponent },
  { path: 'treatment/:id', component: PatientCardTreatmentComponent },
  { path: 'epid/:id', component: PatientCardEpidComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientCardRoutingModule {}
