import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { PatientCardMainComponent } from './patient-card-main/patient-card-main.component';
import { PatientCardTreatmentComponent } from './patient-card-treatment/patient-card-treatment.component';
import { PatientCardEpidComponent } from './patient-card-epid/patient-card-epid.component';
import { PatientCardVisitComponent } from './patient-card-visit/patient-card-visit.component';
import { PatientCardDiagnosticsComponent } from './patient-card-diagnostics/patient-card-diagnostics.component';
import { PatientCardResistenceComponent } from './patient-card-resistence/patient-card-resistence.component';

const routes: Routes = [
  { path: 'main/:id', component: PatientCardMainComponent },
  { path: 'treatment/:id', component: PatientCardTreatmentComponent },
  { path: 'epid/:id', component: PatientCardEpidComponent },
  { path: 'visit/:id', component: PatientCardVisitComponent },
  { path: 'diagnostics/:id', component: PatientCardDiagnosticsComponent },
  { path: 'resistence/:id', component: PatientCardResistenceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientCardRoutingModule {}
