import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { PatientCardMainComponent } from './patient-card-main/patient-card-main.component';
import { PatientCardTreatmentComponent } from './patient-card-treatment/patient-card-treatment.component';
import { PatientCardEpidComponent } from './patient-card-epid/patient-card-epid.component';
import { PatientCardVisitComponent } from './patient-card-visit/patient-card-visit.component';
import { PatientCardDiagnosticsComponent } from './patient-card-diagnostics/patient-card-diagnostics.component';
import { PatientCardResistenceComponent } from './patient-card-resistence/patient-card-resistence.component';
import { PatientCardDiagnosticConcomitantComponent } from './patient-card-diagnostic-concomitant/patient-card-diagnostic-concomitant.component';
import { PatientCardAclComponent } from './patient-card-acl/patient-card-acl.component';
import { PatientCardDiagnosticManualComponent } from './patient-card-diagnostic-manual/patient-card-diagnostic-manual.component';
import { PatientCardRecipeComponent } from './patient-card-recipe/patient-card-recipe.component';
import { PatientCardPregnantComponent } from './patient-card-pregnant/patient-card-pregnant.component';
import { PatientCardChildComponent } from './patient-card-child/patient-card-child.component';

const routes: Routes = [
  { path: 'main/:id', component: PatientCardMainComponent },
  { path: 'treatment/:id', component: PatientCardTreatmentComponent },
  { path: 'epid/:id', component: PatientCardEpidComponent },
  { path: 'visit/:id', component: PatientCardVisitComponent },
  { path: 'diagnostics/:id', component: PatientCardDiagnosticsComponent },
  { path: 'resistence/:id', component: PatientCardResistenceComponent },
  { path: 'dconcomitant/:id', component: PatientCardDiagnosticConcomitantComponent },
  { path: 'acl/:id', component: PatientCardAclComponent },
  { path: 'dmanual/:id', component: PatientCardDiagnosticManualComponent },
  { path: 'recipe/:id', component: PatientCardRecipeComponent },
  { path: 'preg/:id', component: PatientCardPregnantComponent },
  { path: 'child/:id', component: PatientCardChildComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientCardRoutingModule {}
