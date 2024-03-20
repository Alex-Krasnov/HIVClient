import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckPlaceComponent } from './check-place/check-place.component';
import { ListsRoutingModule } from './lists-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListMainComponent } from './list-main/list-main.component';
import { CountryComponent } from './country/country.component';
import { CodeMKB10Component } from './code-mkb10/code-mkb10.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { ShowillnesComponent } from './showillnes/showillnes.component';
import { CheckCourseComponent } from './check-course/check-course.component';
import { InfectCourseComponent } from './infect-course/infect-course.component';
import { ArvtComponent } from './arvt/arvt.component';
import { InvalidComponent } from './invalid/invalid.component';
import { EpidDoctorComponent } from './epid-doctor/epid-doctor.component';
import { CorrespIllnessComponent } from './corresp-illness/corresp-illness.component';
import { CureChangeComponent } from './cure-change/cure-change.component';
import { RangeTherapyComponent } from './range-therapy/range-therapy.component';
import { LpuComponent } from './lpu/lpu.component';
import { HospCourseComponent } from './hosp-course/hosp-course.component';
import { HospResultComponent } from './hosp-result/hosp-result.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { PlaceCheckComponent } from './place-check/place-check.component';
import { VulnerableGroupComponent } from './vulnerable-group/vulnerable-group.component';
import { EducationComponent } from './education/education.component';
import { FamilyStatusComponent } from './family-status/family-status.component';
import { EmploymentComponent } from './employment/employment.component';
import { TransmisionMechComponent } from './transmision-mech/transmision-mech.component';
import { SituationDetectComponent } from './situation-detect/situation-detect.component';
import { VacComponent } from './vac/vac.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    CheckPlaceComponent,
    ListMainComponent,
    CountryComponent,
    CodeMKB10Component,
    DiagnosisComponent,
    ShowillnesComponent,
    CheckCourseComponent,
    InfectCourseComponent,
    ArvtComponent,
    InvalidComponent,
    EpidDoctorComponent,
    CorrespIllnessComponent,
    CureChangeComponent,
    RangeTherapyComponent,
    LpuComponent,
    HospCourseComponent,
    HospResultComponent,
    CabinetComponent,
    PlaceCheckComponent,
    VulnerableGroupComponent,
    EducationComponent,
    FamilyStatusComponent,
    EmploymentComponent,
    TransmisionMechComponent,
    SituationDetectComponent,
    VacComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    ListsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ListsModule { }
