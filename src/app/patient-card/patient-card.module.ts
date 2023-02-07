import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientCardRoutingModule } from './patient-card-routing.module';
import { PatientCardMainComponent } from './patient-card-main/patient-card-main.component';



@NgModule({
  declarations: [
    PatientCardMainComponent
  ],
  imports: [
    CommonModule, 
    PatientCardRoutingModule
  ]
})
export class PatientCardModule { }
