import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, lastValueFrom, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { PatientCardChildForm } from './patient-card-child-form.model';
import { ModalService } from 'src/app/services/modal.service';
import { PatientCardChildModel } from 'src/app/_interfaces/patient-card-child.model';
import { PatientCardChildService } from 'src/app/services/patient-card/patient-card-child.service';
import { ModalPatientCardService } from 'src/app/services/patient-card/modal-patient-card.service';

@Component({
  selector: 'app-patient-card-child',
  templateUrl: './patient-card-child.component.html',
  styleUrls: ['./patient-card-child.component.css']
})
export class PatientCardChildComponent implements OnInit, OnDestroy {
  private PatineCardChildForm: BehaviorSubject<FormGroup | undefined>
  PatineCardChildForm$: Observable<FormGroup>
    private destroy$ = new Subject<void>();

  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu: boolean = false;
  isVisibleAddit: boolean = false;
  IsErr: boolean = false;
  needUpd: boolean = false;

  Id: number;
  patient: PatientCardChildModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;
  patientPregMs = new FormArray([]);
  pervValue: object;

  constructor(
    private patientService: PatientCardChildService,
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
      .subscribe((data: PatientCardChildModel) => {
        this.patient = data;
        this.initForm();
        this.pervValue = {
          patientId: this.Id,
          familyType: data.familyType,
          mId: data.mId,
          fId: data.fId,
          firstCheckDate: data.firstCheckDate,
          childPlace: data.childPlace,
          breastMonth: data.breastMonth,
          childPhp: data.childPhp,
          materHome: data.materHome,
          childDescr: data.childDescr,
          growth: data.growth,
          weight: data.weight,
          forma309: data.forma309,
          lastCareDate: data.lastCareDate,
          communicationParentDate: data.communicationParentDate,
          callingDistrictSpecDate: data.callingDistrictSpecDate,
          refusalPhp: data.refusalPhp,
          refusalResearch: data.refusalResearch,
          refusalTherapy: data.refusalTherapy
        }
      });
  }

  initForm() {
    this.PatineCardChildForm = new BehaviorSubject(this.fb.group(new PatientCardChildForm(this.patient, this.listService)));
    this.PatineCardChildForm$ = this.PatineCardChildForm.asObservable();

    this.patientFormSub = this.PatineCardChildForm$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.patientForm = data;
      });

    this.patientForm.statusChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe((status) => {
      if (status == 'VALID')
        this.needUpd = true;
    })
  }

  async updatePatient() {
    let curValue = {
      patientId: this.patientForm.controls['patientId'].value,
      familyType: this.patientForm.controls['familyType'].value,
      mId: this.patientForm.controls['mId'].value,
      fId: this.patientForm.controls['fId'].value,
      firstCheckDate: this.patientForm.controls['firstCheckDate'].value,
      childPlace: this.patientForm.controls['childPlace'].value,
      breastMonth: this.patientForm.controls['breastMonth'].value,
      childPhp: this.patientForm.controls['childPhp'].value,
      materHome: this.patientForm.controls['materHome'].value,
      childDescr: this.patientForm.controls['childDescr'].value,
      growth: this.patientForm.controls['growth'].value,
      weight: this.patientForm.controls['weight'].value,
      forma309: this.patientForm.controls['forma309'].value,
      lastCareDate: this.patientForm.controls['lastCareDate'].value,
      communicationParentDate: this.patientForm.controls['communicationParentDate'].value,
      callingDistrictSpecDate: this.patientForm.controls['callingDistrictSpecDate'].value,
      refusalPhp: this.patientForm.controls['refusalPhp'].value,
      refusalResearch: this.patientForm.controls['refusalResearch'].value,
      refusalTherapy: this.patientForm.controls['refusalTherapy'].value,
    };

    if (typeof curValue.mId == 'string' && curValue.mId.length == 0)
      curValue.mId = null as number

    if (typeof curValue.fId == 'string' && curValue.fId.length == 0)
      curValue.fId = null as number

    if (typeof curValue.breastMonth == 'string' && curValue.breastMonth.length == 0)
      curValue.breastMonth = null as number

    if (typeof curValue.growth == 'string' && curValue.growth.length == 0)
      curValue.growth = null as number

    if (typeof curValue.weight == 'string' && curValue.weight.length == 0)
      curValue.weight = null as number

    if (!(JSON.stringify(this.pervValue) === JSON.stringify(curValue))) {
      
      await lastValueFrom(
         this.patientService.updatePatient(curValue)
        .pipe(takeUntil(this.destroy$))
      )

      this.pervValue = {
        patientId: this.Id,
        familyType: curValue.familyType,
        mId: curValue.mId,
        fId: curValue.fId,
        firstCheckDate: curValue.firstCheckDate,
        childPlace: curValue.childPlace,
        breastMonth: curValue.breastMonth,
        childPhp: curValue.childPhp,
        materHome: curValue.materHome,
        childDescr: curValue.childDescr,
        growth: curValue.growth,
        weight: curValue.weight,
        forma309: curValue.forma309,
        lastCareDate: curValue.lastCareDate,
        communicationParentDate: curValue.communicationParentDate,
        callingDistrictSpecDate: curValue.callingDistrictSpecDate,
        refusalPhp: curValue.refusalPhp,
        refusalResearch: curValue.refusalResearch,
        refusalTherapy: curValue.refusalTherapy
      };

      this.patientForm.markAsPristine()
    }
  }

  async leaveComponent(name: string) {
    if (this.patientForm.valid) {

      if (this.needUpd)
        await this.updatePatient()

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
