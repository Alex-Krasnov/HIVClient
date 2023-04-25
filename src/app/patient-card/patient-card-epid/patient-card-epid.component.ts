import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PatientCardEpidModel } from 'src/app/_interfaces/patient-card-epid.model';
import { ListService } from 'src/app/services/list.service';
import { PatientCardEpidService } from 'src/app/services/patient-card-epid.service';
import { InList } from 'src/app/validators/in-lst';
import { PatientCardEpidForm } from './patient-card-epid-form.model';

@Component({
  selector: 'app-patient-card-epid',
  templateUrl: './patient-card-epid.component.html',
  styleUrls: ['./patient-card-epid.component.css']
})
export class PatientCardEpidComponent implements OnInit {
  private PatineCardEpidForm: BehaviorSubject<FormGroup | undefined>
  PatineCardEpidForm$: Observable<FormGroup>
  
  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu:boolean = false;
  ccIsValid: boolean = true;
  rcIsValid: boolean = true;
  ocIsValid: boolean = true;
  piIsValid: boolean = true;
  pniIsValid: boolean = true;
  cvIsValid: boolean = true;
  cIsValid: boolean = true;
  IsErr: boolean = false;
  needUpd: boolean = false;

  Id: number;
  type1 = 1;
  type2 = 2;
  type3 = 6;
  patient: PatientCardEpidModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;
  patientChemsexes = new FormArray([]);
  patientConstantContacts = new FormArray([]);
  patientRandomContacts = new FormArray([]);
  patientOtherContacts = new FormArray([]);
  patientPavInjs = new FormArray([]);
  patientPavNotInjs = new FormArray([]);
  patientCovidVac = new FormArray([]);
  patientCovid = new FormArray([]);
  pervValue: object;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientCardEpidService,
    private fb: FormBuilder,
    private router: Router,
    private listService: ListService
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => { this.Id = params['id'] })
    this.getData()
  }

  getData(): void {
    this.patientService.getData(this.Id)
      .subscribe((data:PatientCardEpidModel) => {
        this.patient = data;
        this.initForm();
        this.pervValue = {
          patientId: this.Id,
          dtMailReg: data.dtMailReg,
          eduName: data.eduName,
          employmentName: data.employmentName,
          epidDocName: data.epidDocName,
          epidTimeInfectEnd: data.epidTimeInfectEnd,
          epidTimeInfectStart: data.epidTimeInfectStart,
          epidemCom: data.epidemCom,
          familyStatusName: data.familyStatusName,
          numMail: data.numMail,
          situationDetectName: data.situationDetectName,
          transName: data.transName,
          transmitionMechName: data.transmitionMechName
        }
      });
  }

  initForm(){
    this.PatineCardEpidForm = new BehaviorSubject(this.fb.group(new PatientCardEpidForm(this.patient, this.listService)));
    this.PatineCardEpidForm$ = this.PatineCardEpidForm.asObservable();

    this.patientFormSub = this.PatineCardEpidForm$
      .subscribe(data => {
        this.patientForm = data;
    });

    this.patient.chemsex.map(
        (item: any) => {
          const sForm = new FormGroup ({
            drugId: new FormControl(item.drugId),
            drugName: new FormControl(item.drugName),
            contactTypeName: new FormControl(item.contactTypeName, {
              asyncValidators: [InList.validateInfectCourseLong(this.listService)],
              updateOn: 'blur'
            }),
            ynName: new FormControl(item.ynName, {
              asyncValidators: [InList.validateYn(this.listService)],
              updateOn: 'blur'
            })
          });
          this.patientChemsexes.push(sForm);
        }
    );

    this.patient.constantContact.map(
      (item: any) => {
        const sForm = new FormGroup ({
          contactId: new FormControl(item.contactId, {
            asyncValidators: [InList.validatePatientCard(this.listService)],
            updateOn: 'blur'
          }),
          Fio: new FormControl({value: item.fio, disabled: true}),
          InfectCourseName: new FormControl(item.infectCourseName, {
            asyncValidators: [InList.validateInfectCourseLong(this.listService)],
            updateOn: 'blur'
          })
        });
        this.patientConstantContacts.push(sForm);
      }
    );

    this.patient.randomContact.map(
      (item: any) => {
        const sForm = new FormGroup ({
          contactId: new FormControl(item.contactId, {
            asyncValidators: [InList.validatePatientCard(this.listService)],
            updateOn: 'blur'
          }),
          Fio: new FormControl({value: item.fio, disabled: true}),
          InfectCourseName: new FormControl(item.infectCourseName, {
            asyncValidators: [InList.validateInfectCourseLong(this.listService)],
            updateOn: 'blur'
          })
        });
        this.patientRandomContacts.push(sForm);
      }
    );

    this.patient.otherContact.map(
      (item: any) => {
        const sForm = new FormGroup ({
          contactId: new FormControl(item.contactId, {
            asyncValidators: [InList.validatePatientCard(this.listService)],
            updateOn: 'blur'
          }),
          Fio: new FormControl({value: item.fio, disabled: true}),
          InfectCourseName: new FormControl(item.infectCourseName, {
            asyncValidators: [InList.validateInfectCourseLong(this.listService)],
            updateOn: 'blur'
          })
        });
        this.patientOtherContacts.push(sForm);
      }
    );
    
    this.patient.pavInj.map(
      (item: any) => {
        const sForm = new FormGroup ({
          drugId: new FormControl(item.drugId),
          dateStart: new FormControl(item.dateStart),
          dateEnd: new FormControl(item.dateEnd),
          drugName: new FormControl(item.drugName),
          ynName: new FormControl(item.ynName, {
            asyncValidators: [InList.validateYn(this.listService)],
            updateOn: 'blur'
          })
        });
        this.patientPavInjs.push(sForm);
      }
    );

    this.patient.pavNotInj.map(
      (item: any) => {
        const sForm = new FormGroup ({
          drugId: new FormControl(item.drugId),
          dateStart: new FormControl(item.dateStart),
          dateEnd: new FormControl(item.dateEnd),
          drugName: new FormControl(item.drugName),
          ynName: new FormControl(item.ynName, {
            asyncValidators: [InList.validateYn(this.listService)],
            updateOn: 'blur'
          })
        });
        this.patientPavNotInjs.push(sForm);
      }
    );

    this.patient.covidVac.map(
      (item: any) => {
        const sForm = new FormGroup ({
          vacId: new FormControl(item.vacId),
          dVac1: new FormControl(item.dVac1),
          dVac2: new FormControl(item.dVac2),
          vacName: new FormControl(item.vacName, {
            asyncValidators: [InList.validateVac(this.listService)],
            updateOn: 'blur'
          })
        });
        this.patientCovidVac.push(sForm);
      }
    );

    this.patient.covid.map(
      (item: any) => {
        const sForm = new FormGroup ({
          covidId: new FormControl(item.covidId),
          dPositivRes: new FormControl(item.dPositivRes),
          dNegativeRes: new FormControl(item.dNegativeRes),
          covidMKB: new FormControl(item.covidMKB, {
            asyncValidators: [InList.validateMkb10Covid(this.listService)],
            updateOn: 'blur'
          })
        });
        this.patientCovid.push(sForm);
      }
    );

    this.patientForm.statusChanges.subscribe( (status) => {
      if(status == 'VALID')
        this.needUpd = true;
    })
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

  giveCCForUpd(isValid: boolean){
     this.ccIsValid = isValid;
  }
  
  giveRCForUpd(isValid: boolean){
    this.rcIsValid = isValid;
  }

  giveOCForUpd(isValid: boolean){
    this.ocIsValid = isValid;
  }

  givePIForUpd(isValid: boolean){
    this.piIsValid = isValid;
  }

  givePNIForUpd(isValid: boolean){
    this.pniIsValid = isValid;
  }

  giveCVForUpd(isValid: boolean){
    this.cvIsValid = isValid;
  }

  giveCForUpd(isValid: boolean){
    console.log('give', isValid);
    
    this.cIsValid = isValid;
  }

  updatePatient(){
    // let curValue = {
    //   patientId: this.Id,
    //   invalidName: this.patientForm.controls['invalidName'].value,
    //   stageCom: this.patientForm.controls['stageCom'].value,
    //   patientCom: this.patientForm.controls['patientCom'].value,
    // };
    
    // if(!(JSON.stringify(this.pervValue) === JSON.stringify(curValue))){
    //   this.patientService.updatePatient(curValue.patientId, curValue.stageCom, curValue.patientCom, curValue.invalidName).subscribe()

    //   this.pervValue = {
    //     patientId: curValue.patientId,
    //     invalidName: curValue.invalidName,
    //     stageCom: curValue.stageCom,
    //     patientCom: curValue.patientCom
    //   };

    //   this.patientForm.markAsPristine()
    // }
  }

  leaveComponent(name: string){
    if(this.patientForm.valid && this.ccIsValid && this.rcIsValid && this.ocIsValid){
      if(this.needUpd)
        this.updatePatient()
      if(name == '/main'){
        this.router.navigate([name]);
        return null
      }
      this.router.navigate([name+this.Id])
    } else{
      Object.keys(this.patientForm.controls).forEach(
        (data: any) => {
          if(this.patientForm.controls[data].invalid)
            console.log(data);          
        }
      )
      confirm(`Ошибка в заполнении данных!`)
    }
  }
}
