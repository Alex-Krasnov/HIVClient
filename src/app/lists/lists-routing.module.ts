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
import { InvalidComponent } from './invalid/invalid.component';
import { EpidDoctorComponent } from './epid-doctor/epid-doctor.component';
import { CorrespIllnessComponent } from './corresp-illness/corresp-illness.component';
import { CureChangeComponent } from './cure-change/cure-change.component';
import { RangeTherapyComponent } from './range-therapy/range-therapy.component';
import { LpuComponent } from './lpu/lpu.component';
import { HospCourseComponent } from './hosp-course/hosp-course.component';
import { HospResultComponent } from './hosp-result/hosp-result.component';
import { CabinetComponent } from './cabinet/cabinet.component';


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
    { path: 'arvt', component: ArvtComponent, canActivate: [AuthGuard] },
    { path: 'invalid', component: InvalidComponent, canActivate: [AuthGuard] },
    { path: 'epid-doctor', component: EpidDoctorComponent, canActivate: [AuthGuard] },
    { path: 'coresp-illnes', component: CorrespIllnessComponent, canActivate: [AuthGuard] },
    { path: 'cure-change', component: CureChangeComponent, canActivate: [AuthGuard] },
    { path: 'range-therapy', component: RangeTherapyComponent, canActivate: [AuthGuard] },
    { path: 'lpu', component: LpuComponent, canActivate: [AuthGuard] },
    { path: 'hosp-course', component: HospCourseComponent, canActivate: [AuthGuard] },
    { path: 'hosp-result', component: HospResultComponent, canActivate: [AuthGuard] },
    { path: 'cabinet', component: CabinetComponent, canActivate: [AuthGuard] }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule {}
