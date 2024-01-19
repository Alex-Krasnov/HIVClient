import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';
import { PatientCardPregnantForm } from './patient-card-pregnant-form.model';
import { PatientCardPregnantModel } from 'src/app/_interfaces/patient-card-pregnant.model';
import { PatientCardPregnantService } from 'src/app/services/patient-card-pregnant.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-patient-card-pregnant',
  templateUrl: './patient-card-pregnant.component.html',
  styleUrls: ['./patient-card-pregnant.component.css']
})
export class PatientCardPregnantComponent implements OnInit {
  private PatineCardPregnantForm: BehaviorSubject<FormGroup | undefined>
  PatineCardPregnantForm$: Observable<FormGroup>
  
  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu:boolean = false;
  isVisibleAddit:boolean = false;
  sIsValid: boolean = true;
  IsErr: boolean = false;
  needUpd: boolean = false;
  updSchema: string;

  Id: number;
  patient: PatientCardPregnantModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;
  patientPregMs = new FormArray([]);
  pervValue: object;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientCardPregnantService,
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
      .subscribe((data:PatientCardPregnantModel) => {
        this.patient = data;
        this.initForm();
        this.pervValue = {
          patientId: this.Id,
          pregCheck: data.pregCheck,
          pregMonth: data.pregMonth
        }
      });
  }

  initForm(){
    this.PatineCardPregnantForm = new BehaviorSubject(this.fb.group(new PatientCardPregnantForm(this.patient, this.listService)));
    this.PatineCardPregnantForm$ = this.PatineCardPregnantForm.asObservable();

    this.patientFormSub = this.PatineCardPregnantForm$
      .subscribe(data => {
        this.patientForm = data;
    });

    this.patient.pregnantMs.map(
        (item: any) => {
          const sForm = new FormGroup ({
            pregId: new FormControl(item.pregId, Validators.required),
            pwCheck: new FormControl(item.pwCheck),
            pwMonth: new FormControl(item.pwMonth),
            pregDate: new FormControl(item.pregDate),
            childBirthDate: new FormControl(item.childBirthDate),
            birthType: new FormControl(item.birthType, {
              asyncValidators: [InList.validateBirthType(this.listService)],
              updateOn: 'blur'
            }),
            childCount: new FormControl(item.childCount, {
              asyncValidators: [InList.validateChildCount(this.listService)],
              updateOn: 'blur'
            }),
            childId: new FormControl(item.childId, {
              asyncValidators: [InList.validatePatientCard(this.listService)],
              updateOn: 'blur'
            }),
            startMonth: new FormControl(item.startMonth),
            childFamilyName: new FormControl(item.childFamilyName),
            childFirstName: new FormControl(item.childFirstName),
            childThirdName: new FormControl(item.childThirdName),
            pregDescr: new FormControl(item.pregDescr),
            phpSchema1: new FormControl(item.phpSchema1, {
              asyncValidators: [InList.validateCureSchemaName(this.listService)],
              updateOn: 'blur'
            }),
            phpSchema2: new FormControl(item.phpSchema2, {
              asyncValidators: [InList.validateCureSchemaName(this.listService)],
              updateOn: 'blur'
            }),
            phpSchema3: new FormControl(item.phpSchema3, {
              asyncValidators: [InList.validateCureSchemaName(this.listService)],
              updateOn: 'blur'
            })
          });
          this.patientPregMs.push(sForm);
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

  giveSForUpd(isValid: boolean){
     this.sIsValid = isValid;
  }
  
  giveSchema (schema: string){
    this.updSchema = schema
  }

  updatePatient(){
    let curValue = {
      patientId: this.patientForm.controls['patientId'].value,
      pregCheck: this.patientForm.controls['pregCheck'].value,
      pregMonth: this.patientForm.controls['pregMonth'].value,
    };
    
    if(!(JSON.stringify(this.pervValue) === JSON.stringify(curValue))){
      this.patientService.updatePatient( curValue.patientId, curValue.pregCheck, curValue.pregMonth ).subscribe()

      this.pervValue = {
          patientId: this.Id,
          pregCheck: curValue.pregCheck,
          pregMonth: curValue.pregMonth
      };

      this.patientForm.markAsPristine()
    }
  }

  leaveComponent(name: string){
    if(this.patientForm.valid && this.sIsValid){
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
