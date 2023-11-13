import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';
import { PatientCardVisitService } from 'src/app/services/patient-card-visit.service';
import { PatientCardVisitModel } from 'src/app/_interfaces/patient-card-visit.model';
import { PatientCardVisitForm } from './patient-card-visit-form.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-patient-visit',
  templateUrl: './patient-card-visit.component.html',
  styleUrls: ['./patient-card-visit.component.css']
})
export class PatientCardVisitComponent implements OnInit {
  private PatineCardVisitForm: BehaviorSubject<FormGroup | undefined>
  PatineCardVisitForm$: Observable<FormGroup>
  
  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu:boolean = false;
  cIsValid: boolean = true;
  coIsValid: boolean = true;
  rIsValid: boolean = true;
  IsErr: boolean = false;
  needUpd: boolean = false;

  isModal: boolean = true;

  Id: number;
  patient: PatientCardVisitModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;
  patientChecks = new FormArray([]);
  patientCheckOuts = new FormArray([]);
  patientRegistries = new FormArray([]);

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientCardVisitService,
    private fb: FormBuilder,
    private router: Router,
    private listService: ListService,
    private modal: ModalService
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => { this.Id = params['id'] })
    this.getData()
  }

  getData(): void {
    this.patientService.getData(this.Id)
      .subscribe((data:PatientCardVisitModel) => {
        this.patient = data;
        this.initForm();
      });
  }

  initForm(){
    this.PatineCardVisitForm = new BehaviorSubject(this.fb.group(new PatientCardVisitForm(this.patient)));
    this.PatineCardVisitForm$ = this.PatineCardVisitForm.asObservable();

    this.patientFormSub = this.PatineCardVisitForm$
      .subscribe(data => {
        this.patientForm = data;
    });
    
    this.patient.checksOut.map(
      (item: any) => {
        const sForm = new FormGroup ({
          checkDateNext: new FormControl(item.checkDateNext),
          checkDate: new FormControl(item.checkDate, Validators.required),
          checkDoc: new FormControl(item.checkDoc, {
            validators: Validators.required,
            asyncValidators: [InList.validateDoctor(this.listService)],
            updateOn: 'blur'
          }),
          checkSpec: new FormControl(item.checkSpec, {
            validators: Validators.required,
            asyncValidators: [InList.validateSpec(this.listService)],
            updateOn: 'blur'
          })
        });
        this.patientCheckOuts.push(sForm);
      }
    );

    this.patient.registries.map(
      (item: any) => {
        const sForm = new FormGroup ({
          regDate: new FormControl(item.regDate, Validators.required),
          regCheck: new FormControl(item.regCheck),
          regCom: new FormControl(item.regCom),
          regCab: new FormControl(item.regCab, {
            validators: Validators.required,
            asyncValidators: [InList.validateCabinet(this.listService)],
            updateOn: 'blur'
          }),
          regTime: new FormControl(item.regTime, {
            asyncValidators: [InList.validateRegTime(this.listService)],
            updateOn: 'blur'
          }),
          regDoc: new FormControl(item.regDoc, {
            asyncValidators: [InList.validateDoctor(this.listService)],
            updateOn: 'blur'
          })
        });
        this.patientRegistries.push(sForm);
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

  giveCForUpd(isValid: boolean){
     this.cIsValid = isValid;
  }
  
  giveCOForUpd(isValid: boolean){
    this.coIsValid = isValid;
  }

  giveRForUpd(isValid: boolean){
    this.rIsValid = isValid;
  }

  leaveComponent(name: string){
    if(this.cIsValid && this.coIsValid && this.rIsValid){
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

  openReg(){
    this.modal.regOpen()
    this.modal.regIsVisible1$.next(true)
  }
}