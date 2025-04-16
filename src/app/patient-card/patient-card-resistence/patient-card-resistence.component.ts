import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { PatientCardResistenceService } from 'src/app/services/patient-card/patient-card-resistence.service';
import { PatientCardResistenceForm } from './patient-card-resistence-form.model';
import { PatientCardResistenceModel } from 'src/app/_interfaces/patient-card-resistence.model';
import { ModalService } from 'src/app/services/modal.service';
import { ModalPatientCardService } from 'src/app/services/patient-card/modal-patient-card.service';

@Component({
  selector: 'app-patient-card-resistence',
  templateUrl: './patient-card-resistence.component.html',
  styleUrls: ['./patient-card-resistence.component.css']
})
export class PatientCardResistenceComponent implements OnInit, OnDestroy {
  private PatineCardResistenceForm: BehaviorSubject<FormGroup | undefined>
  PatineCardResistenceForm$: Observable<FormGroup>
    private destroy$ = new Subject<void>();

  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu: boolean = false;
  isVisibleAddit: boolean = false;

  Id: number;
  patient: PatientCardResistenceModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;

  patientResistence = new FormArray([]);

  constructor(
    private patientService: PatientCardResistenceService,
    private fb: FormBuilder,
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
      .subscribe((data: PatientCardResistenceModel) => {
        this.patient = data;
        this.initForm();
      });
  }

  initForm() {
    this.PatineCardResistenceForm = new BehaviorSubject(this.fb.group(new PatientCardResistenceForm(this.patient)));
    this.PatineCardResistenceForm$ = this.PatineCardResistenceForm.asObservable();

    this.patientFormSub = this.PatineCardResistenceForm$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => { this.patientForm = data; });

    this.patient.resistences.map(
      (item: any) => {
        const sForm = new FormGroup({
          date: new FormControl({ value: item.date, disabled: true }),
          lr001: new FormControl({ value: item.lr001, disabled: true }),
          lr005: new FormControl({ value: item.lr005, disabled: true }),
          lr010: new FormControl({ value: item.lr010, disabled: true }),
          lr015: new FormControl({ value: item.lr015, disabled: true }),
          lr020: new FormControl({ value: item.lr020, disabled: true }),
          lr025: new FormControl({ value: item.lr025, disabled: true }),
          lr030: new FormControl({ value: item.lr030, disabled: true }),
          lr035: new FormControl({ value: item.lr035, disabled: true }),
          lr040: new FormControl({ value: item.lr040, disabled: true }),
          lr045: new FormControl({ value: item.lr045, disabled: true }),
          lr050: new FormControl({ value: item.lr050, disabled: true }),
          lr055: new FormControl({ value: item.lr055, disabled: true }),
          lr060: new FormControl({ value: item.lr060, disabled: true }),
          lr065: new FormControl({ value: item.lr065, disabled: true }),
          lr070: new FormControl({ value: item.lr070, disabled: true }),
          lr075: new FormControl({ value: item.lr075, disabled: true }),
          lr080: new FormControl({ value: item.lr080, disabled: true }),
          lr085: new FormControl({ value: item.lr085, disabled: true }),
          lr090: new FormControl({ value: item.lr090, disabled: true }),
          lr095: new FormControl({ value: item.lr095, disabled: true }),
          lr100: new FormControl({ value: item.lr100, disabled: true }),
          lr105: new FormControl({ value: item.lr105, disabled: true }),
          lr110: new FormControl({ value: item.lr110, disabled: true })
        });
        this.patientResistence.push(sForm);
      }
    );
  }

  leaveComponent(name: string) {
    if (true) {

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