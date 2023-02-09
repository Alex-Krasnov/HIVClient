import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientCardRoutingModule } from './patient-card-routing.module';
import { PatientCardMainComponent } from './patient-card-main/patient-card-main.component';
import { PatientCardMain } from 'src/app/services/patient-card-main.service';
import { FormsModule } from '@angular/forms';
import { PatientBlotComponent } from './patient-blot/patient-blot.component';



@NgModule({
  declarations: [
    PatientCardMainComponent,
    PatientBlotComponent
  ],
  imports: [
    CommonModule, 
    PatientCardRoutingModule,
    FormsModule
  ],
  providers:[
    PatientCardMain
  ]
})
export class PatientCardModule { }
