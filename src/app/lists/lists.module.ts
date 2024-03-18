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
    CabinetComponent
  ],
  imports: [
    CommonModule,
    ListsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ListsModule { }
