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
import { PatientCardJailComponent } from './patient-card-jail/patient-card-jail.component';
import { PatientCardCovidComponent } from './patient-card-covid/patient-card-covid.component';
import { AuthGuard } from '../guards/auth.guard';
import { PatientCardFilesComponent } from './patient-card-files/patient-card-files.component';

const routes: Routes = [
  { path: 'main/:id', component: PatientCardMainComponent, canActivate: [AuthGuard]  },
  { path: 'treatment/:id', component: PatientCardTreatmentComponent, canActivate: [AuthGuard]  },
  { path: 'epid/:id', component: PatientCardEpidComponent, canActivate: [AuthGuard]  },
  { path: 'visit/:id', component: PatientCardVisitComponent, canActivate: [AuthGuard]  },
  { path: 'diagnostics/:id', component: PatientCardDiagnosticsComponent, canActivate: [AuthGuard]  },
  { path: 'resistence/:id', component: PatientCardResistenceComponent, canActivate: [AuthGuard]  },
  { path: 'dconcomitant/:id', component: PatientCardDiagnosticConcomitantComponent, canActivate: [AuthGuard]  },
  { path: 'acl/:id', component: PatientCardAclComponent, canActivate: [AuthGuard]  },
  { path: 'dmanual/:id', component: PatientCardDiagnosticManualComponent, canActivate: [AuthGuard]  },
  { path: 'recipe/:id', component: PatientCardRecipeComponent, canActivate: [AuthGuard]  },
  { path: 'preg/:id', component: PatientCardPregnantComponent, canActivate: [AuthGuard]  },
  { path: 'child/:id', component: PatientCardChildComponent, canActivate: [AuthGuard]  },
  { path: 'jail/:id', component: PatientCardJailComponent, canActivate: [AuthGuard]  },
  { path: 'covid/:id', component: PatientCardCovidComponent, canActivate: [AuthGuard]  },
  { path: 'files/:id', component: PatientCardFilesComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientCardRoutingModule {}
