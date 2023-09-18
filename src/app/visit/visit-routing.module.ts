import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectDocCabDateRangeComponent } from './select-doc-cab-date-range/select-doc-cab-date-range.component';
import { AuthGuard } from '../guards/auth.guard';
import { SelectDateComponent } from './select-date/select-date.component';
import { SelectTimeComponent } from './select-time/select-time.component';

const routes: Routes = [
  { path: 'sldocdabdaterange', component: SelectDocCabDateRangeComponent, canActivate: [AuthGuard]  },
  { path: 'sldate', component: SelectDateComponent, canActivate: [AuthGuard]  },
  { path: 'sltime', component: SelectTimeComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitRoutingModule { }
