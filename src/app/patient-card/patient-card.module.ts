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
import { PatientCardEpidComponent } from './patient-card-epid/patient-card-epid.component';
import { PatientContactComponent } from './patient-contact/patient-contact.component';
import { PatientPavComponent } from './patient-pav/patient-pav.component';
import { PatientChemsexComponent } from './patient-chemsex/patient-chemsex.component';
import { PatientCovidVacEpidComponent } from './patient-covid-vac-epid/patient-covid-vac-epid.component';
import { PatientCovidEpidComponent } from './patient-covid-epid/patient-covid-epid.component';
import { PatientCardEpidService } from '../services/patient-card-epid.service';
import { PatientPavNotInjComponent } from './patient-pav-not-inj/patient-pav-not-inj.component';
import { PatientVisitComponent } from './patient-visit/patient-visit.component';
import { PatientCardVisitService } from '../services/patient-card-visit.service';
import { PatientCheckComponent } from './patient-check/patient-check.component';
import { PatientCheckOutComponent } from './patient-check-out/patient-check-out.component';
import { PatientRegistryComponent } from './patient-registry/patient-registry.component';
import { TalonComponent } from './talon/talon.component';



@NgModule({
  declarations: [
    PatientCardMainComponent,
    PatientBlotComponent,
    PatientStageComponent,
    PatientSecondDeseaseComponent,
    PatientCardTreatmentComponent,
    PatientCorrepIllnessesComponent,
    PatientCureSchemasComponent,
    PatientHospResultRsComponent,
    PatientCardEpidComponent,
    PatientContactComponent,
    PatientPavComponent,
    PatientChemsexComponent,
    PatientCovidVacEpidComponent,
    PatientCovidEpidComponent,
    PatientPavNotInjComponent,
    PatientVisitComponent,
    PatientCheckComponent,
    PatientCheckOutComponent,
    PatientRegistryComponent,
    TalonComponent
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
    PatientCardEpidService,
    PatientCardVisitService,
    ListService,
    InList
  ]
})
export class PatientCardModule { }
