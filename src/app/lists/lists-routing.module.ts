import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { CheckPlaceComponent } from './check-place/check-place.component';
import { AuthGuard } from '../guards/auth.guard';
import { ListMainComponent } from './list-main/list-main.component';
import { CountryComponent } from './country/country.component';
import { CodeMKB10Component } from './code-mkb10/code-mkb10.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { ShowillnesComponent } from './showillnes/showillnes.component';
import { CheckCourseComponent } from './check-course/check-course.component';
import { InfectCourseComponent } from './infect-course/infect-course.component';
import { ArvtComponent } from './arvt/arvt.component';


const routes: Routes = [{
  path: '',
  component: ListMainComponent,
  children: [
    { path: 'check-place', component: CheckPlaceComponent, canActivate: [AuthGuard] },
    { path: 'country', component: CountryComponent, canActivate: [AuthGuard] },
    { path: 'code-mkb10', component: CodeMKB10Component, canActivate: [AuthGuard] },
    { path: 'diagnosis', component: DiagnosisComponent, canActivate: [AuthGuard] },
    { path: 'showillness', component: ShowillnesComponent, canActivate: [AuthGuard] },
    { path: 'check-course', component: CheckCourseComponent, canActivate: [AuthGuard] },
    { path: 'infect-course', component: InfectCourseComponent, canActivate: [AuthGuard] },
    { path: 'arvt', component: ArvtComponent, canActivate: [AuthGuard] }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule {}
