import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { PatientCardRecipeModel } from 'src/app/_interfaces/patient-card-recipe.model';
import { ListService } from 'src/app/services/list.service';
import { PatientCardRecipeService } from 'src/app/services/patient-card/patient-card-recipe.service';
import { InList } from 'src/app/validators/in-lst';
import { PatientCardRecipeForm } from './patient-card-recipe-form.model';
import { ModalService } from 'src/app/services/modal.service';
import { ModalPatientCardService } from 'src/app/services/patient-card/modal-patient-card.service';

@Component({
  selector: 'app-patient-card-recipe',
  templateUrl: './patient-card-recipe.component.html',
  styleUrls: ['./patient-card-recipe.component.css']
})
export class PatientCardRecipeComponent implements OnInit, OnDestroy {
  private PatineCardForm: BehaviorSubject<FormGroup | undefined>
  PatineCardForm$: Observable<FormGroup>
    private destroy$ = new Subject<void>();

  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu: boolean = false;
  isVisibleAddit: boolean = false;
  rIsValid: boolean = true;
  IsErr: boolean = false;
  needUpd: boolean = false;

  Id: number;
  patient: PatientCardRecipeModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;

  patientRecipes = new FormArray([]);

  constructor(
    private patientService: PatientCardRecipeService,
    private fb: FormBuilder,
    public modal: ModalService,
    private listService: ListService,
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
      .subscribe((data: PatientCardRecipeModel) => {
        this.patient = data;
        this.initForm();
      });
  }

  initForm() {
    this.PatineCardForm = new BehaviorSubject(this.fb.group(new PatientCardRecipeForm(this.patient)));
    this.PatineCardForm$ = this.PatineCardForm.asObservable();

    this.patientFormSub = this.PatineCardForm$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.patientForm = data;
      });

    this.patient.recipes.map(
      (item: any) => {
        const sForm = new FormGroup({
          ser: new FormControl(item.ser, Validators.required),
          num: new FormControl(item.num, Validators.required),
          prescrDate: new FormControl(item.prescrDate),
          doctor: new FormControl(item.doctor, {
            asyncValidators: [InList.validateDoctor(this.listService)],
            updateOn: 'blur'
          }),
          medicine: new FormControl(item.medicine, {
            asyncValidators: [InList.validateMedicine(this.listService)],
            updateOn: 'blur'
          }),
          packNum: new FormControl(item.packNum),
          finSource: new FormControl(item.finSource, {
            asyncValidators: [InList.validateFinSource(this.listService)],
            updateOn: 'blur'
          }),
          giveDate: new FormControl(item.giveDate),
          giveDateCheck: new FormControl(item.giveDateCheck),
          medicineGive: new FormControl(item.medicineGive),
          packNumGive: new FormControl(item.packNumGive)
        });
        this.patientRecipes.push(sForm);
      }
    );

    this.patientForm.statusChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe((status) => {
      if (status == 'VALID')
        this.needUpd = true;
    })
  }

  giveForUpd(isValid: boolean) {
    this.rIsValid = isValid;
  }

  leaveComponent(name: string) {
    if (this.rIsValid) {

      // if (this.needUpd)
      //   this.updatePatient()

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
