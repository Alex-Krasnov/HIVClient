import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientCardMainModel } from 'src/app/_interfaces/patient-card-main.model';
import { PatientCardMain } from 'src/app/services/patient-card-main.service';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PatientCardMainForm } from './patient-card-main-form.model';

@Component({
  selector: 'app-patient-card-main',
  templateUrl: './patient-card-main.component.html',
  styleUrls: ['./patient-card-main.component.css']
})
export class PatientCardMainComponent implements OnInit {
  private PatineCardMainForm: BehaviorSubject<FormGroup | undefined>
  PatineCardMainForm$: Observable<FormGroup>

  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu:boolean = false;
  Id: number;
  IsErr: boolean = false;

  patient: PatientCardMainModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;
  patientSecondDeseases: FormArray;

  constructor(
    private route: ActivatedRoute,
    private getPatient: PatientCardMain,
    private fb: FormBuilder
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => { this.Id = params['id'] });
    this.getPatientData();
  }

  openDropdown(str:string): void{
    switch(str){
      case "Диагностика":
        this.isVisibleDiagn = !this.isVisibleDiagn;
        break;
      case "Системные":
        this.isVisibleSystem = !this.isVisibleSystem;
        break;
      case "Меню":
        this.isVisibleMenu = !this.isVisibleMenu;
        break;
    } 
  }

  getPatientData(): void {
    this.getPatient.getPatientData(this.Id)
      .subscribe((data:PatientCardMainModel) => {
        this.patient = data;
        this.initForm();

        // console.log(this.patient.secondDeseases);
        console.log(this.patientForm.value);
      });
  }

  initForm(){
    this.PatineCardMainForm = new BehaviorSubject(this.fb.group(new PatientCardMainForm(this.patient)));
    this.PatineCardMainForm$ = this.PatineCardMainForm.asObservable()

    this.patientFormSub = this.PatineCardMainForm$
      .subscribe(data => {
        this.patientForm = data
        this.patientSecondDeseases = this.patientForm.get('secondDeseases') as FormArray
    })
  }

  delBlot(blotId: number) {
    console.log('blotId - ', blotId);
    this.getPatient.delPatientBlot(this.Id, blotId)
    .subscribe();
    location.reload();
  }
  // delStage(date: Date) {
  //   console.log('date - ', date);
  //   this.getPatient.delPatientStage(this.Id, date)
  //   .subscribe();
  //   location.reload();
  // }

  // initForm(){
  //   this.patientForm= this.fb.group({
  //     patientId: [{value: this.patient.patientId, disabled: true}],
  //     inputDate: [{value: this.patient.inputDate, disabled: true}],
  //     familyName: [this.patient.familyName, [Validators.pattern('[А-я]*'),Validators.required]],
  //     firstName: [this.patient.firstName, [Validators.pattern('[А-я]*'),Validators.required]],
  //     thirdName: [this.patient.thirdName, [Validators.pattern('[А-я]*')]],
  //     birthDate: [this.patient.birthDate, [Validators.required]],
  //     sex: [this.patient.sex, [Validators.required]],
  //     regOnDate: [this.patient.regOnDate],
  //     regOffDate: [this.patient.regOffDate],
  //     regOffReason: [this.patient.regOffReason],
  //     unrzFr: [this.patient.unrzFr, [Validators.pattern('[0-9]*')]],
  //     region: [this.patient.region, [Validators.required]],
  //     cityName: [this.patient.cityName],
  //     locationName: [this.patient.locationName],
  //     phone: [this.patient.phone],
  //     addrStreat: [this.patient.addrStreat],
  //     addrHouse: [this.patient.addrHouse],
  //     addrExt: [this.patient.addrExt],
  //     addrFlat: [this.patient.addrFlat],
  //     regionFact: [this.patient.regionFact],
  //     cityNameFact: [this.patient.cityNameFact],
  //     locationNameFact: [this.patient.locationNameFact],
  //     dtRegBeg: [this.patient.dtRegBeg],
  //     dtRefEnd: [this.patient.dtRefEnd],
  //     indexFact: [this.patient.indexFact],
  //     addrStreatFact: [this.patient.addrStreatFact],
  //     addrHouseFact: [this.patient.addrHouseFact],
  //     addrExtFact: [this.patient.addrExtFact],
  //     addrFlatFact: [this.patient.addrFlatFact],
  //     comm: [this.patient.comm],
  //     country: [this.patient.country, [Validators.required]],
  //     placeCheck: [this.patient.placeCheck],
  //     codeMKB10: [this.patient.codeMKB10],
  //     cardNo: [this.patient.cardNo],
  //     vulnerableGroup: [this.patient.vulnerableGroup],
  //     heightOld: [this.patient.heightOld],
  //     weightOld: [this.patient.weightOld],
  //     checkCourseShort: [this.patient.checkCourseShort],
  //     infectCourseShort: [this.patient.infectCourseShort],
  //     dieCourseShort: [this.patient.dieCourseShort],
  //     checkCourseLong: [this.patient.checkCourseLong],
  //     infectCourseLong: [this.patient.infectCourseLong],
  //     dieCourseLong: [this.patient.dieCourseLong],
  //     transfAreaDate: [this.patient.transfAreaDate],
  //     transfFederDate: [this.patient.transfFederDate],
  //     ufsinDate: [this.patient.ufsinDate],
  //     dieInputDate: [{value: this.patient.dieInputDate, disabled: true}],
  //     dieDate: [this.patient.dieDate],
  //     dieAidsDate: [this.patient.dieAidsDate],
  //     arvt: [this.patient.arvt],
  //     invalid: [this.patient.invalid],
  //     archive: [this.patient.archive],
  //     codeWord: [this.patient.codeWord],
  //     snils: [this.patient.snils, [Validators.pattern('[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9] [0-9][0-9]'), Validators.required]],
  //     fioChange: [this.patient.fioChange],
  //     headPhysician: [this.patient.headPhysician],
  //     zamMedPart: [this.patient.zamMedPart]
  //   });
  // }
}
