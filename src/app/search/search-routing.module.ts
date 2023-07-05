import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { SearchMainComponent } from './search-main/search-main.component';
import { SearchFastComponent } from './search-fast/search-fast.component';
import { SearchMainInfComponent } from './search-main-inf/search-main-inf.component';
import { SearchPregnantComponent } from './search-pregnant/search-pregnant.component';
import { SearchChildComponent } from './search-child/search-child.component';


const routes: Routes = [
  {
    path: '',
    component: SearchMainComponent,
    children: [
      { path: 'fast', component: SearchFastComponent, canActivate: [AuthGuard] },
      { path: 'main', component: SearchMainInfComponent, canActivate: [AuthGuard] },
      { path: 'preg', component: SearchPregnantComponent, canActivate: [AuthGuard] },
      { path: 'child', component: SearchChildComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
