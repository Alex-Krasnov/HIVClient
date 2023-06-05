import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientCardRoutingModule } from './patient-card-routing.module';
import { PatientCardMainComponent } from './patient-card-main/patient-card-main.component';
import { PatientCardMainService } from 'src/app/services/patient-card-main.service';
import { PatientCardTreatmentService } from 'src/app/services/patient-card-treatment.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientBlotComponent } from './patient-blot/patient-blot.component';
import { PatientStageComponent } from './patient-stage/patient-stage.component';
import { PatientSecondDeseaseComponent } from './patient-second-desease/patient-second-desease.component';
import { ListService } from '../services/list.service';
import { InList } from '../validators/in-lst';
import { PatientCardTreatmentComponent } from './patient-card-treatment/patient-card-treatment.component';
import { PatientCorrepIllnessesComponent } from './patient-correp-illnesses/patient-correp-illnesses.component';
import { PatientCureSchemasComponent } from './patient-cure-schemas/patient-cure-schemas.component';
import { PatientHospResultRsComponent } from './patient-hosp-result-rs/patient-hosp-result-rs.component';
import { PatientCardEpidComponent } from './patient-card-epid/patient-card-epid.component';
import { PatientContactComponent } from './patient-contact/patient-contact.component';
import { PatientPavComponent } from './patient-pav/patient-pav.component';
import { PatientChemsexComponent } from './patient-chemsex/patient-chemsex.component';
import { PatientCovidVacEpidComponent } from './patient-covid-vac-epid/patient-covid-vac-epid.component';
import { PatientCovidEpidComponent } from './patient-covid-epid/patient-covid-epid.component';
import { PatientCardEpidService } from '../services/patient-card-epid.service';
import { PatientPavNotInjComponent } from './patient-pav-not-inj/patient-pav-not-inj.component';
import { PatientCardVisitComponent } from './patient-card-visit/patient-card-visit.component';
import { PatientCardVisitService } from '../services/patient-card-visit.service';
import { PatientCheckComponent } from './patient-check/patient-check.component';
import { PatientCheckOutComponent } from './patient-check-out/patient-check-out.component';
import { PatientRegistryComponent } from './patient-registry/patient-registry.component';
import { TalonComponent } from './talon/talon.component';
import { PatientCardDiagnosticsComponent } from './patient-card-diagnostics/patient-card-diagnostics.component';
import { Diagnostics3ColComponent } from './diagnostics3-col/diagnostics3-col.component';
import { Diagnostics2ColComponent } from './diagnostics2-col/diagnostics2-col.component';
import { ImStatComponent } from './im-stat/im-stat.component';
import { ImStatCD348Component } from './im-stat-cd348/im-stat-cd348.component';
import { PatientCardResistenceComponent } from './patient-card-resistence/patient-card-resistence.component';
import { ResistenceComponent } from './resistence/resistence.component';
import { PatientCardDiagnosticConcomitantComponent } from './patient-card-diagnostic-concomitant/patient-card-diagnostic-concomitant.component';
import { HepCPcrComponent } from './hep-cpcr/hep-cpcr.component';
import { PatientCardAclComponent } from './patient-card-acl/patient-card-acl.component';
import { GEComponent } from './ge/ge.component';
import { BHComponent } from './bh/bh.component';
import { PatientCardDiagnosticManualComponent } from './patient-card-diagnostic-manual/patient-card-diagnostic-manual.component';
import { Diagnostic3ColCrudComponent } from './diagnostic3-col-crud/diagnostic3-col-crud.component';
import { PatientCardRecipeComponent } from './patient-card-recipe/patient-card-recipe.component';
import { RecipeComponent } from './recipe/recipe.component';
import { SchemaSelectComponent } from './schema-select/schema-select.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { MyFilterPipe } from './schema-select/formarray-filter.pipe';
import { PatientCardPregnantComponent } from './patient-card-pregnant/patient-card-pregnant.component';
import { PregnantMComponent } from './pregnant-m/pregnant-m.component';
import { PatientCardChildComponent } from './patient-card-child/patient-card-child.component';
import { PatientCardJailComponent } from './patient-card-jail/patient-card-jail.component';
import { JailComponent } from './jail/jail.component';
import { PatientCardCovidComponent } from './patient-card-covid/patient-card-covid.component';
import { CovidComponent } from './covid/covid.component';
import { SubCovidComponent } from './sub-covid/sub-covid.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    PatientCardMainComponent,
    PatientBlotComponent,
    PatientStageComponent,
    PatientSecondDeseaseComponent,
    PatientCardTreatmentComponent,
    PatientCorrepIllnessesComponent,
    PatientCureSchemasComponent,
    PatientHospResultRsComponent,
    PatientCardEpidComponent,
    PatientContactComponent,
    PatientPavComponent,
    PatientChemsexComponent,
    PatientCovidVacEpidComponent,
    PatientCovidEpidComponent,
    PatientPavNotInjComponent,
    PatientCardVisitComponent,
    PatientCheckComponent,
    PatientCheckOutComponent,
    PatientRegistryComponent,
    TalonComponent,
    PatientCardDiagnosticsComponent,
    Diagnostics3ColComponent,
    Diagnostics2ColComponent,
    ImStatComponent,
    ImStatCD348Component,
    PatientCardResistenceComponent,
    ResistenceComponent,
    PatientCardDiagnosticConcomitantComponent,
    HepCPcrComponent,
    PatientCardAclComponent,
    GEComponent,
    BHComponent,
    PatientCardDiagnosticManualComponent,
    Diagnostic3ColCrudComponent,
    PatientCardRecipeComponent,
    RecipeComponent,
    SchemaSelectComponent,
    ModalWindowComponent,
    MyFilterPipe,
    PatientCardPregnantComponent,
    PregnantMComponent,
    PatientCardChildComponent,
    PatientCardJailComponent,
    JailComponent,
    PatientCardCovidComponent,
    CovidComponent,
    SubCovidComponent
  ],
  imports: [
    CommonModule, 
    PatientCardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    ScrollingModule
  ],
  providers:[
    PatientCardMainService,
    PatientCardTreatmentService,
    PatientCardEpidService,
    PatientCardVisitService,
    ListService,
    InList
  ]
})
export class PatientCardModule { }
