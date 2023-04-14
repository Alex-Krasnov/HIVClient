import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientCardRoutingModule } from './patient-card-routing.module';
import { PatientCardMainComponent } from './patient-card-main/patient-card-main.component';
import { PatientCardMainService } from 'src/app/services/patient-card-main.service';
import { PatientCardTreatmentService } from 'src/app/services/patient-card-treatment.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientBlotComponent } from './patient-blot/patient-blot.component';
import { PatientStageComponent } from './patient-stage/patient-stage.component';
import { PatientSecondDeseaseComponent } from './patient-second-desease/patient-second-desease.component';
import { ListService } from '../services/list.service';
import { InList } from '../validators/in-lst';
import { PatientCardTreatmentComponent } from './patient-card-treatment/patient-card-treatment.component';
import { PatientCorrepIllnessesComponent } from './patient-correp-illnesses/patient-correp-illnesses.component';
import { PatientCureSchemasComponent } from './patient-cure-schemas/patient-cure-schemas.component';
import { PatientHospResultRsComponent } from './patient-hosp-result-rs/patient-hosp-result-rs.component';



@NgModule({
  declarations: [
    PatientCardMainComponent,
    PatientBlotComponent,
    PatientStageComponent,
    PatientSecondDeseaseComponent,
    PatientCardTreatmentComponent,
    PatientCorrepIllnessesComponent,
    PatientCureSchemasComponent,
    PatientHospResultRsComponent
  ],
  imports: [
    CommonModule, 
    PatientCardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    PatientCardMainService,
    PatientCardTreatmentService,
    ListService,
    InList
  ]
})
export class PatientCardModule { }
