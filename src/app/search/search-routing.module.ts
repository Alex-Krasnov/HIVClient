import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchMainComponent } from './search-main/search-main.component';
import { SearchFastComponent } from './search-fast/search-fast.component';


const routes: Routes = [
  {
    path: '',
    component: SearchMainComponent,
    children: [
      { path: 'fast', component: SearchFastComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
