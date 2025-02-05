import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFastComponent } from './search-fast/search-fast.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchMainComponent } from './search-main/search-main.component';
import { DisplayResultComponent } from './display-result/display-result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SearchMainInfComponent } from './search-main-inf/search-main-inf.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { SelectListComponent } from './select-list/select-list.component';
import { SelectDieListComponent } from './select-die-list/select-die-list.component';
import { SearchPregnantComponent } from './search-pregnant/search-pregnant.component';
import { SelectList2ColComponent } from './select-list2-col/select-list2-col.component';
import { SearchChildComponent } from './search-child/search-child.component';
import { SearchTreatmentComponent } from './search-treatment/search-treatment.component';
import { SearchVisitComponent } from './search-visit/search-visit.component';
import { SearchEpidComponent } from './search-epid/search-epid.component';
import { SearchHospComponent } from './search-hosp/search-hosp.component';
import { SearchNonresidentComponent } from './search-nonresident/search-nonresident.component';
import { SearchCovidComponent } from './search-covid/search-covid.component';




@NgModule({
  declarations: [
    SearchFastComponent,
    SearchMainComponent,
    DisplayResultComponent,
    SearchMainInfComponent,
    ModalWindowComponent,
    SelectListComponent,
    SelectDieListComponent,
    SearchPregnantComponent,
    SelectList2ColComponent,
    SearchChildComponent,
    SearchTreatmentComponent,
    SearchVisitComponent,
    SearchEpidComponent,
    SearchHospComponent,
    SearchNonresidentComponent,
    SearchCovidComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule
  ]
})
export class SearchModule { }
