import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitRoutingModule } from './visit-routing.module';
import { SelectDocCabDateRangeComponent } from './select-doc-cab-date-range/select-doc-cab-date-range.component';
import { SelectDateComponent } from './select-date/select-date.component';
import { SelectTimeComponent } from './select-time/select-time.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    SelectDocCabDateRangeComponent,
    SelectDateComponent,
    SelectTimeComponent
  ],
  imports: [
    CommonModule,
    VisitRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    MatAutocompleteModule,
    MatInputModule
  ]
})
export class VisitModule { }
