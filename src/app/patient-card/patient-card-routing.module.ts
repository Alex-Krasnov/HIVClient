import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { PatientCardJailComponent } from './patient-card-jail/patient-card-jail.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: 'jail/:id', component: PatientCardJailComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientCardRoutingModule {}
