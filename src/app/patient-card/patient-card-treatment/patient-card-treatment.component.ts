import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PatientCardTreatmentModel } from 'src/app/_interfaces/patient-card-treatment.model';
import { ListService } from 'src/app/services/list.service';
import { PatientCardTreatmentService } from 'src/app/services/patient-card-treatment.service';
import { PatientCardTreatmentForm } from './patient-card-treatment-form.model';
import { InList } from 'src/app/validators/in-lst';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-patient-card-treatment',
  templateUrl: './patient-card-treatment.component.html',
  styleUrls: ['./patient-card-treatment.component.css']
})
export class PatientCardTreatmentComponent implements OnInit{
  private PatineCardTreatmentForm: BehaviorSubject<FormGroup | undefined>
  PatineCardTreatmentForm$: Observable<FormGroup>
  
  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu:boolean = false;
  isVisibleAddit:boolean = false;
  siIsValid: boolean = true;
  csIsValid: boolean = true;
  hrIsValid: boolean = true;
  hepCIsValid: boolean = true;
  IsErr: boolean = false;
  needUpd: boolean = false;

  Id: number;
  patient: PatientCardTreatmentModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;
  patientCorrespIllnesses = new FormArray([]);
  patientCureSchemas = new FormArray([]);
  patientHospResultRs = new FormArray([]);
  patientHepCs = new FormArray([]);
  pervValue: object;
  updSchema: string;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientCardTreatmentService,
    private fb: FormBuilder,
    private router: Router,
    private listService: ListService,
    public modal: ModalService
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => { this.Id = params['id'] })
    this.getData()
  }

  getData(): void {
    this.patientService.getData(this.Id)
      .subscribe((data:PatientCardTreatmentModel) => {
        this.patient = data;
        this.initForm();
        this.pervValue = {
          patientId: this.Id,
          invalidName: data.invalidName,
          stageCom: data.stageCom,
          patientCom: data.patientCom,
          hepBdate: data.hepBdate,
          hepBDescr: data.hepBDescr
        }
      });
  }

  initForm(){
    this.PatineCardTreatmentForm = new BehaviorSubject(this.fb.group(new PatientCardTreatmentForm(this.patient, this.listService)));
    this.PatineCardTreatmentForm$ = this.PatineCardTreatmentForm.asObservable();

    this.patientFormSub = this.PatineCardTreatmentForm$
      .subscribe(data => {
        this.patientForm = data;
    });

    this.patient.correspIllnesses.map(
        (cor: any) => {
          const corForm = new FormGroup ({
            correspIllness: new FormControl(cor.correspIllness, {
              validators: Validators.required,
              asyncValidators: [InList.validateCorrespIllnesses(this.listService)],
              updateOn: 'blur'
            }),
            correspIllnessDate: new FormControl({value: cor.correspIllnessDate, disabled: true})
          });
          this.patientCorrespIllnesses.push(corForm);
        }
    );

    this.patient.cureSchemas.map(
      (cur: any) => {
        const curForm = new FormGroup ({
          cureSchemaName: new FormControl(cur.cureSchemaName, {
            validators: Validators.required,
            asyncValidators: [InList.validateCureSchemaName(this.listService)],
            updateOn: 'blur'
          }),
          cureChangeName: new FormControl(cur.cureChangeName, {
            asyncValidators: [InList.validateCureChangeName(this.listService)],
            updateOn: 'blur'
          }),
          rangeTherapy: new FormControl(cur.rangeTherapy, {
            asyncValidators: [InList.validateRangeTherapy(this.listService)],
            updateOn: 'blur'
          }),
          startDate: new FormControl(cur.startDate, Validators.required),
          endDate: new FormControl(cur.endDate),
          schemaComm: new FormControl(cur.schemaComm),
          protNum: new FormControl(cur.protNum),
          last: new FormControl(cur.last)
        });
        this.patientCureSchemas.push(curForm);
      }
    );

    this.patient.hospResultRs.map(
      (hosp: any) => {
        const curForm = new FormGroup ({
          lpuName: new FormControl(hosp.lpuName, {
            validators: Validators.required,
            asyncValidators: [InList.validateLpuName(this.listService)],
            updateOn: 'blur'
          }),
          hospCourseName: new FormControl(hosp.hospCourseName, {
            asyncValidators: [InList.validateHospCourseName(this.listService)],
            updateOn: 'blur'
          }),
          hospResult: new FormControl(hosp.hospResult, {
            asyncValidators: [InList.validateHospResult(this.listService)],
            updateOn: 'blur'
          }),
          dateHospIn: new FormControl(hosp.dateHospIn, Validators.required),
          dateHospOut: new FormControl(hosp.dateHospOut)
        });
        this.patientHospResultRs.push(curForm);
      }
    );

    this.patient.hepCs.map(
      (hep: any) => {
        const curForm = new FormGroup ({
          id: new FormControl(hep.id, {updateOn: 'blur'}),
          dateStart: new FormControl(hep.dateStart, {updateOn: 'blur'}),
          dateEnd: new FormControl(hep.dateEnd, {updateOn: 'blur'}),
          descr: new FormControl(hep.descr, {updateOn: 'blur'}),
          dateCreate: new FormControl({value: hep.dateCreate, disabled: true})
        });
        this.patientHepCs.push(curForm);
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

  giveSIForUpd(isValid: boolean){
    this.siIsValid = isValid;
  }
  
  giveCSForUpd(isValid: boolean){
    this.csIsValid = isValid;
  }

  giveHRForUpd(isValid: boolean){
    this.hrIsValid = isValid;    
  }

  giveHepCForUpd(isValid: boolean){
    this.hepCIsValid = isValid;    
  }

  updatePatient(){
    let curValue = {
      patientId: this.Id,
      invalidName: this.patientForm.controls['invalidName'].value,
      stageCom: this.patientForm.controls['stageCom'].value,
      patientCom: this.patientForm.controls['patientCom'].value,
      hepBdate: this.patientForm.controls['hepBdate'].value,
      hepBDescr: this.patientForm.controls['hepBDescr'].value,
    };
    
    if(!(JSON.stringify(this.pervValue) === JSON.stringify(curValue))){
      this.patientService.updatePatient(curValue.patientId, curValue.stageCom, curValue.patientCom, curValue.invalidName, curValue.hepBdate, curValue.hepBDescr).subscribe()

      this.pervValue = {
        patientId: curValue.patientId,
        invalidName: curValue.invalidName,
        stageCom: curValue.stageCom,
        patientCom: curValue.patientCom,
        hepBdate: curValue.hepBdate,
        hepBDescr: curValue.hepBDescr
      };

      this.patientForm.markAsPristine()
    }
  }

  leaveComponent(name: string){
    if(this.patientForm.valid && this.siIsValid && this.csIsValid && this.hrIsValid &&  this.hepCIsValid){
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

  giveSchema (schema: string){
    this.updSchema = schema
  }

  openReferalAnalysis(){
    this.modal.referalAnalysisOpen()
  }
}
