import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFastComponent } from './search-fast/search-fast.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchMainComponent } from './search-main/search-main.component';
import { DisplayResultComponent } from './display-result/display-result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    SearchFastComponent,
    SearchMainComponent,
    DisplayResultComponent
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
