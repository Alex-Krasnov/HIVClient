import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { SearchMainComponent } from './search-main/search-main.component';
import { SearchFastComponent } from './search-fast/search-fast.component';
import { SearchMainInfComponent } from './search-main-inf/search-main-inf.component';
import { SearchPregnantComponent } from './search-pregnant/search-pregnant.component';
import { SearchChildComponent } from './search-child/search-child.component';
import { SearchTreatmentComponent } from './search-treatment/search-treatment.component';
import { SearchAnalysisComponent } from './search-analysis/search-analysis.component';
import { SearchAclComponent } from './search-acl/search-acl.component';
import { SearchVisitComponent } from './search-visit/search-visit.component';
import { SearchEpidComponent } from './search-epid/search-epid.component';
import { SearchHospComponent } from './search-hosp/search-hosp.component';
import { SearchNonresidentComponent } from './search-nonresident/search-nonresident.component';
import { SearchCovidComponent } from './search-covid/search-covid.component';

const routes: Routes = [
  {
    path: '',
    component: SearchMainComponent,
    children: [
      { path: 'fast', component: SearchFastComponent, canActivate: [AuthGuard] },
      { path: 'main', component: SearchMainInfComponent, canActivate: [AuthGuard] },
      { path: 'preg', component: SearchPregnantComponent, canActivate: [AuthGuard] },
      { path: 'child', component: SearchChildComponent, canActivate: [AuthGuard] },
      { path: 'treatment', component: SearchTreatmentComponent, canActivate: [AuthGuard] },
      { path: 'analysis', component: SearchAnalysisComponent, canActivate: [AuthGuard] },
      { path: 'acl', component: SearchAclComponent, canActivate: [AuthGuard] },
      { path: 'visit', component: SearchVisitComponent, canActivate: [AuthGuard] },
      { path: 'epid', component: SearchEpidComponent, canActivate: [AuthGuard] },
      { path: 'hosp', component: SearchHospComponent, canActivate: [AuthGuard] },
      { path: 'nonresident', component: SearchNonresidentComponent, canActivate: [AuthGuard] },
      { path: 'covid', component: SearchCovidComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
