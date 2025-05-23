import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { PatientCardAclModel } from 'src/app/_interfaces/patient-card-acl.model';
import { PatientCardAclService } from 'src/app/services/patient-card/patient-card-acl.service';
import { PatientCardAclForm } from './patient-card-acl-form.model';
import { ModalService } from 'src/app/services/modal.service';
import { ModalPatientCardService } from 'src/app/services/patient-card/modal-patient-card.service';

@Component({
  selector: 'app-patient-card-acl',
  templateUrl: './patient-card-acl.component.html',
  styleUrls: ['./patient-card-acl.component.css']
})
export class PatientCardAclComponent implements OnInit,OnDestroy {
    private PatineCardResistenceForm: BehaviorSubject<FormGroup | undefined>
    PatineCardResistenceForm$: Observable<FormGroup>
    private destroy$ = new Subject<void>();
    
    isVisibleSystem: boolean = false;
    isVisibleDiagn: boolean = false;
    isVisibleMenu:boolean = false;
    isVisibleAddit:boolean = false;
  
    Id: number;
    patient: PatientCardAclModel | undefined;
    patientForm: FormGroup;
    patientFormSub: Subscription;
  
    patientBh = new FormArray([]);
    patientGe = new FormArray([]);
  
    constructor(
      private patientService: PatientCardAclService,
      private fb: FormBuilder,
      public modal: ModalService,
      private pcModal: ModalPatientCardService
    ){}
  
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
        .subscribe((data:PatientCardAclModel) => {
          this.patient = data;
          this.initForm();
        });
    }
  
    initForm(){
      this.PatineCardResistenceForm = new BehaviorSubject(this.fb.group(new PatientCardAclForm(this.patient)));
      this.PatineCardResistenceForm$ = this.PatineCardResistenceForm.asObservable();
  
      this.patientFormSub = this.PatineCardResistenceForm$
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {this.patientForm = data;});
      
      this.patient.bhs.map(
          (item: any) => {
            const sForm = new FormGroup ({
              date: new FormControl({value: item.date, disabled: true}),
              b001: new FormControl({value: item.b001, disabled: true}),
              b005: new FormControl({value: item.b005, disabled: true}),
              b010: new FormControl({value: item.b010, disabled: true}),
              b015: new FormControl({value: item.b015, disabled: true}),
              b020: new FormControl({value: item.b020, disabled: true}),
              b025: new FormControl({value: item.b025, disabled: true}),
              b030: new FormControl({value: item.b030, disabled: true}),
              b035: new FormControl({value: item.b035, disabled: true}),
              b040: new FormControl({value: item.b040, disabled: true}),
              b045: new FormControl({value: item.b045, disabled: true}),
              b050: new FormControl({value: item.b050, disabled: true}),
              b055: new FormControl({value: item.b055, disabled: true}),
              b060: new FormControl({value: item.b060, disabled: true}),
              b065: new FormControl({value: item.b065, disabled: true}),
              b070: new FormControl({value: item.b070, disabled: true}),
              b075: new FormControl({value: item.b075, disabled: true}),
              b080: new FormControl({value: item.b080, disabled: true}),
              b085: new FormControl({value: item.b085, disabled: true}),
              b090: new FormControl({value: item.b090, disabled: true}),
              b095: new FormControl({value: item.b095, disabled: true}),
              b100: new FormControl({value: item.b100, disabled: true}),
              b105: new FormControl({value: item.b105, disabled: true}),
              b110: new FormControl({value: item.b110, disabled: true})
            });
            this.patientBh.push(sForm);
          }
      );

      this.patient.ges.map(
        (item: any) => {
          const sForm = new FormGroup ({
            date: new FormControl({value: item.date, disabled: true}),
            b001: new FormControl({value: item.b001, disabled: true}),
            b005: new FormControl({value: item.b005, disabled: true}),
            b010: new FormControl({value: item.b010, disabled: true}),
            b015: new FormControl({value: item.b015, disabled: true}),
            b020: new FormControl({value: item.b020, disabled: true}),
            b025: new FormControl({value: item.b025, disabled: true}),
            b030: new FormControl({value: item.b030, disabled: true}),
            b035: new FormControl({value: item.b035, disabled: true}),
            b040: new FormControl({value: item.b040, disabled: true}),
            b045: new FormControl({value: item.b045, disabled: true}),
            b050: new FormControl({value: item.b050, disabled: true}),
            b055: new FormControl({value: item.b055, disabled: true}),
            b060: new FormControl({value: item.b060, disabled: true}),
            b065: new FormControl({value: item.b065, disabled: true}),
            b070: new FormControl({value: item.b070, disabled: true}),
            b075: new FormControl({value: item.b075, disabled: true}),
            b080: new FormControl({value: item.b080, disabled: true}),
            b085: new FormControl({value: item.b085, disabled: true}),
            b090: new FormControl({value: item.b090, disabled: true}),
            b095: new FormControl({value: item.b095, disabled: true}),
            b100: new FormControl({value: item.b100, disabled: true}),
            b105: new FormControl({value: item.b105, disabled: true}),
            b110: new FormControl({value: item.b110, disabled: true})
          });
          this.patientGe.push(sForm);
        }
    );
    }
  
    leaveComponent(name: string){
      if(true){

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

    openReferalAnalysis(){
      this.modal.referalAnalysisOpen()
    }
  }