import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { PatientCardIhlaModel } from 'src/app/_interfaces/patient-card-ihla.model';
import { ModalService } from 'src/app/services/modal.service';
import { ModalPatientCardService } from 'src/app/services/patient-card/modal-patient-card.service';
import { PatientCardIhlaService } from 'src/app/services/patient-card/patient-card-ihla.service';
import { PatientCardIhlaForm } from './patient-card-ihla-form.model';

@Component({
  selector: 'app-patient-card-ihla',
  templateUrl: './patient-card-ihla.component.html',
  styleUrls: ['./patient-card-ihla.component.css']
})
export class PatientCardIhlaComponent implements OnInit, OnDestroy  {
  private Form: BehaviorSubject<FormGroup | undefined>
  Form$: Observable<FormGroup>
  private destroy$ = new Subject<void>();
  
  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu: boolean = false;
  isVisibleAddit: boolean = false;
  ihlaIsValid: boolean = true;
  IsErr: boolean = false;
  needUpd: boolean = false;

  Id: number;
  patient: PatientCardIhlaModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;
  patientIhla = new FormArray([]);

  constructor(
    private patientService: PatientCardIhlaService,
    private fb: FormBuilder,
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
      .subscribe((data: PatientCardIhlaModel) => {
        this.patient = data;
        this.initForm();
      });
  }
  
  initForm() {
    this.Form = new BehaviorSubject(this.fb.group(new PatientCardIhlaForm(this.patient)));
    this.Form$ = this.Form.asObservable();

    this.patientFormSub = this.Form$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.patientForm = data;
    });

    this.patient.ihla.map(
      (item: any) => {
        const sForm = new FormGroup({
          id: new FormControl(item.id),
          patientId: new FormControl(item.patientId),
          result: new FormControl(item.result),
          analysisDate: new FormControl(item.analysisDate),
          analysisNumber: new FormControl(item.analysisNumber),
        });
        this.patientIhla.push(sForm);
      }
    );
    
    this.patientForm.statusChanges.subscribe((status) => {
      if (status == 'VALID')
        this.needUpd = true;
    })
  }

  giveIhlaForUpd(isValid: boolean) {
    this.ihlaIsValid = isValid;
  }

  leaveComponent(name: string) {
    if (this.ihlaIsValid) {

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
}
