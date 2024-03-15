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
    ArvtComponent
  ],
  imports: [
    CommonModule,
    ListsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ListsModule { }
