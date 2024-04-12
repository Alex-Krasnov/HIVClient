import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PatientCardEpidModel } from 'src/app/_interfaces/patient-card-epid.model';
import { ListService } from 'src/app/services/list.service';
import { PatientCardEpidService } from 'src/app/services/patient-card-epid.service';
import { InList } from 'src/app/validators/in-lst';
import { PatientCardEpidForm } from './patient-card-epid-form.model';
import { pcEpid } from 'src/app/_interfaces/pc-epid.model';
import { ModalService } from 'src/app/services/modal.service';
import { PatientCall } from 'src/app/_interfaces/patient-call.model';
import { EpidChild } from 'src/app/_interfaces/epid-child.model';

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
  isVisibleAddit:boolean = false;
  ccIsValid: boolean = true;
  rcIsValid: boolean = true;
  ocIsValid: boolean = true;
  piIsValid: boolean = true;
  pniIsValid: boolean = true;
  cvIsValid: boolean = true;
  cIsValid: boolean = true;
  chIsValid: boolean = true;
  pcIsValid: boolean = true;
  IsErr: boolean = false;
  needUpd: boolean = false;

  Id: number;
  type1 = 1;
  type2 = 2;
  type3 = 6;
  maxIdEpidChil: number;
  maxIdCall: number;
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
  patientCall = new FormArray([]);
  epidChild = new FormArray([]);
  pervValue: object;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientCardEpidService,
    private fb: FormBuilder,
    private router: Router,
    public modal: ModalService,
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
        
        this.maxIdEpidChil= data.maxIdEpidChil;
        this.maxIdCall= data.maxIdCall;
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
            validators: Validators.required,
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
            validators: Validators.required,
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
            validators: Validators.required,
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

    this.patient.callStatuses.map(
      (item: PatientCall) => {
        const sForm = new FormGroup ({
          id: new FormControl(item.id),
          callDate: new FormControl(item.callDate),
          callStatus: new FormControl(item.callStatus, {
            asyncValidators: [InList.validateCallStatuses(this.listService)],
            updateOn: 'blur'
          })
        });
        this.patientCall.push(sForm);
      }
    );

    this.patient.epidChild.map(
      (item: EpidChild) => {
        const sForm = new FormGroup ({
          id: new FormControl(item.id),
          birthDate: new FormControl(item.birthDate),
          familyName: new FormControl(item.familyName, {updateOn: 'blur'}),
          firstName: new FormControl(item.firstName, {updateOn: 'blur'}),
          thirdName: new FormControl(item.thirdName, {updateOn: 'blur'}),
          exam: new FormControl(item.exam),
          sexName: new FormControl(item.sexName, {
            asyncValidators: [InList.validateSex(this.listService)],
            updateOn: 'blur'
          })
        });
        this.epidChild.push(sForm);
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
      case "Дополнительно":
        this.isVisibleAddit = !this.isVisibleAddit;
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
    this.cIsValid = isValid;
  }

  giveChForUpd(isValid: boolean){
    this.chIsValid = isValid;
  }

  givePcForUpd(isValid: boolean){
    this.pcIsValid = isValid;
  }

  updatePatient(){
    let curValue: pcEpid = {
      patientId: this.patientForm.controls['patientId'].value,
      dtMailReg: this.patientForm.controls['dtMailReg'].value,
      numMail: this.patientForm.controls['numMail'].value,
      eduName: this.patientForm.controls['eduName'].value,
      familyStatusName: this.patientForm.controls['familyStatusName'].value,
      employmentName: this.patientForm.controls['employmentName'].value,
      transName: this.patientForm.controls['transName'].value,
      epidemCom: this.patientForm.controls['epidemCom'].value,
      transmitionMechName: this.patientForm.controls['transmitionMechName'].value,
      situationDetectName: this.patientForm.controls['situationDetectName'].value,
      epidTimeInfectStart: this.patientForm.controls['epidTimeInfectStart'].value,
      epidTimeInfectEnd: this.patientForm.controls['epidTimeInfectEnd'].value,
      epidDocName: this.patientForm.controls['epidDocName'].value
    };
    
    if(!(JSON.stringify(this.pervValue) === JSON.stringify(curValue))){
      this.patientService.updatePatient(curValue).subscribe()

      this.pervValue = {
        patientId: this.Id,
          dtMailReg: curValue.dtMailReg,
          eduName: curValue.eduName,
          employmentName: curValue.employmentName,
          epidDocName: curValue.epidDocName,
          epidTimeInfectEnd: curValue.epidTimeInfectEnd,
          epidTimeInfectStart: curValue.epidTimeInfectStart,
          epidemCom: curValue.epidemCom,
          familyStatusName: curValue.familyStatusName,
          numMail: curValue.numMail,
          situationDetectName: curValue.situationDetectName,
          transName: curValue.transName,
          transmitionMechName: curValue.transmitionMechName
      };

      this.patientForm.markAsPristine()
    }
  }

  leaveComponent(name: string){
    if(this.patientForm.valid && this.ccIsValid && this.rcIsValid && this.ocIsValid && this.piIsValid && 
      this.pniIsValid && this.cvIsValid && this.cIsValid && this.chIsValid && this.pcIsValid){
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

  openReferalAnalysis(){
    this.modal.referalAnalysisOpen()
  }
}
