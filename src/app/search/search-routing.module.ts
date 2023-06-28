import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchMainComponent } from './search-main/search-main.component';
import { SearchFastComponent } from './search-fast/search-fast.component';
import { SearchMainInfComponent } from './search-main-inf/search-main-inf.component';
import { SearchPregnantForm } from './search-pregnant/search-pregnant-form.model';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: SearchMainComponent,
    children: [
      { path: 'fast', component: SearchFastComponent, canActivate: [AuthGuard] },
      { path: 'main', component: SearchMainInfComponent, canActivate: [AuthGuard] },
      { path: 'preg', component: SearchPregnantForm, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
