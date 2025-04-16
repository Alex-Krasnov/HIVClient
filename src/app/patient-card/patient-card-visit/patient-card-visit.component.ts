import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';
import { PatientCardVisitService } from 'src/app/services/patient-card/patient-card-visit.service';
import { PatientCardVisitModel } from 'src/app/_interfaces/patient-card-visit.model';
import { PatientCardVisitForm } from './patient-card-visit-form.model';
import { ModalService } from 'src/app/services/modal.service';
import { ModalPatientCardService } from 'src/app/services/patient-card/modal-patient-card.service';

@Component({
  selector: 'app-patient-card-visit',
  templateUrl: './patient-card-visit.component.html',
  styleUrls: ['./patient-card-visit.component.css']
})
export class PatientCardVisitComponent implements OnInit, OnDestroy {
  private PatineCardVisitForm: BehaviorSubject<FormGroup | undefined>
  PatineCardVisitForm$: Observable<FormGroup>
    private destroy$ = new Subject<void>();
  
  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu:boolean = false;
  isVisibleAddit:boolean = false;
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
    private patientService: PatientCardVisitService,
    private fb: FormBuilder,
    private listService: ListService,
    public modal: ModalService,
    private pcModal: ModalPatientCardService
  ){}

  ngOnInit() {
    
    this.pcModal.patientId
    .pipe(takeUntil(this.destroy$))
    .subscribe(id => {this.Id = id})

    this.pcModal.goNext
    .pipe(takeUntil(this.destroy$))
    .subscribe(name => {
      if(this.patientForm && !this.patientForm.pending){
        this.leaveComponent(name)
      }
    })

    this.getData()
  }

  ngOnDestroy() {
    this.destroy$.next(); // Триггерим завершение
    this.destroy$.complete(); // Очищаем память
  }

  getData(): void {
    this.patientService.getData(this.Id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:PatientCardVisitModel) => {
        this.patient = data;
        this.initForm();
      });
  }

  initForm(){
    this.PatineCardVisitForm = new BehaviorSubject(this.fb.group(new PatientCardVisitForm(this.patient)));
    this.PatineCardVisitForm$ = this.PatineCardVisitForm.asObservable();

    this.patientFormSub = this.PatineCardVisitForm$
      .pipe(takeUntil(this.destroy$))
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
          regDate: new FormControl({value: item.regDate, disabled: false}, Validators.required),
          regCheck: new FormControl({value: item.regCheck, disabled: false}),
          regCom: new FormControl({value: item.regCom, disabled: false}),
          regCab: new FormControl({value: item.regCab, disabled: false}, {
            validators: Validators.required,
            asyncValidators: [InList.validateCabinet(this.listService)],
            updateOn: 'blur'
          }),
          regTime: new FormControl({value: item.regTime, disabled: false}, {
            asyncValidators: [InList.validateRegTime(this.listService)],
            updateOn: 'blur'
          }),
          regDoc: new FormControl({value: item.regDoc, disabled: false}, {
            asyncValidators: [InList.validateDoctor(this.listService)],
            updateOn: 'blur'
          })
        });
        this.patientRegistries.push(sForm);
      }
    );

    this.patientForm.statusChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe( (status) => {
      if(status == 'VALID')
        this.needUpd = true;
    })
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

      // if(this.needUpd)
      //   this.updatePatient()
      
      if(name == 'close'){
        this.pcModal.close()
      }else{
        this.pcModal.currentPage.next(name)
      }
      
    } else{
      Object.keys(this.patientForm.controls).forEach(
        (data: any) => {
          if(this.patientForm.controls[data].invalid)
            console.log("err", data);          
        }
      )
      confirm(`Ошибка в заполнении данных!`)
    }
  }

  openReg(){
    this.modal.regOpen()
    this.modal.regIsVisible1$.next(true)
  }

  openReferalAnalysis(){
    this.modal.referalAnalysisOpen()
  }
}