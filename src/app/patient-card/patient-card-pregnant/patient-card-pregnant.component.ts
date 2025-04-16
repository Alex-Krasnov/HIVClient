import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';
import { PatientCardPregnantForm } from './patient-card-pregnant-form.model';
import { PatientCardPregnantModel } from 'src/app/_interfaces/patient-card-pregnant.model';
import { PatientCardPregnantService } from 'src/app/services/patient-card/patient-card-pregnant.service';
import { ModalService } from 'src/app/services/modal.service';
import { ModalPatientCardService } from 'src/app/services/patient-card/modal-patient-card.service';

@Component({
  selector: 'app-patient-card-pregnant',
  templateUrl: './patient-card-pregnant.component.html',
  styleUrls: ['./patient-card-pregnant.component.css']
})
export class PatientCardPregnantComponent implements OnInit, OnDestroy {
  private PatineCardPregnantForm: BehaviorSubject<FormGroup | undefined>
  PatineCardPregnantForm$: Observable<FormGroup>
    private destroy$ = new Subject<void>();

  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu: boolean = false;
  isVisibleAddit: boolean = false;
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
    private patientService: PatientCardPregnantService,
    private fb: FormBuilder,
    private listService: ListService,
    public modal: ModalService,
    private pcModal: ModalPatientCardService
  ) { }

  ngOnInit() {

    this.pcModal.patientId
    .pipe(takeUntil(this.destroy$))
    .subscribe(id => { this.Id = id })

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
      .subscribe((data: PatientCardPregnantModel) => {
        this.patient = data;
        this.initForm();
        this.pervValue = {
          patientId: this.Id,
          pregCheck: data.pregCheck,
          pregMonth: data.pregMonth
        }
      });
  }

  initForm() {
    this.PatineCardPregnantForm = new BehaviorSubject(this.fb.group(new PatientCardPregnantForm(this.patient, this.listService)));
    this.PatineCardPregnantForm$ = this.PatineCardPregnantForm.asObservable();

    this.patientFormSub = this.PatineCardPregnantForm$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.patientForm = data;
      });

    this.patient.pregnantMs.map(
      (item: any) => {
        const sForm = new FormGroup({
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

    this.patientForm.statusChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe((status) => {
      if (status == 'VALID')
        this.needUpd = true;
    })
  }

  giveSForUpd(isValid: boolean) {
    this.sIsValid = isValid;
  }

  giveSchema(schema: string) {
    this.updSchema = schema
  }

  updatePatient() {
    let curValue = {
      patientId: this.patientForm.controls['patientId'].value,
      pregCheck: this.patientForm.controls['pregCheck'].value,
      pregMonth: this.patientForm.controls['pregMonth'].value,
    };

    if (!(JSON.stringify(this.pervValue) === JSON.stringify(curValue))) {
      this.patientService.updatePatient(curValue.patientId, curValue.pregCheck, curValue.pregMonth)
      .pipe(takeUntil(this.destroy$))
      .subscribe()

      this.pervValue = {
        patientId: this.Id,
        pregCheck: curValue.pregCheck,
        pregMonth: curValue.pregMonth
      };

      this.patientForm.markAsPristine()
    }
  }

  leaveComponent(name: string) {
    if (this.patientForm.valid && this.sIsValid) {

      if (this.needUpd)
        this.updatePatient()

      if (name == 'close') {
        this.pcModal.close()
      } else {
        this.pcModal.currentPage.next(name)
      }

    } else {
      Object.keys(this.patientForm.controls).forEach(
        (data: any) => {
          if (this.patientForm.controls[data].invalid)
            console.log("err", data);
        }
      )
      confirm(`Ошибка в заполнении данных!`)
    }
  }

  openReferalAnalysis() {
    this.modal.referalAnalysisOpen()
  }
}
