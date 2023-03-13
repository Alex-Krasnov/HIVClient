import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientCardMainModel } from 'src/app/_interfaces/patient-card-main.model';
import { PatientCardMainService } from 'src/app/services/patient-card-main.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PatientCardMainForm } from './patient-card-main-form.model';

@Component({
  selector: 'app-patient-card-main',
  templateUrl: './patient-card-main.component.html',
  styleUrls: ['./patient-card-main.component.css']
})
export class PatientCardMainComponent implements OnInit, OnDestroy {
  private PatineCardMainForm: BehaviorSubject<FormGroup | undefined>
  PatineCardMainForm$: Observable<FormGroup>

  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu:boolean = false;
  Id: number;
  IsErr: boolean = false;

  patient: PatientCardMainModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;
  patientSecondDeseases: FormArray;
  patientStages: FormArray;
  patientBlot: FormArray;

  sdForUpd = [];
  stageForUpd = [];
  blotForUpd = [];

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientCardMainService,
    private fb: FormBuilder,
    private router: Router
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => { this.Id = params['id'] });
    this.getPatientData();
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

  getPatientData(): void {
    this.patientService.getPatientData(this.Id)
      .subscribe((data:PatientCardMainModel) => {
        this.patient = data;
        this.initForm();
      });
  }

  initForm(){
    this.PatineCardMainForm = new BehaviorSubject(this.fb.group(new PatientCardMainForm(this.patient)));
    this.PatineCardMainForm$ = this.PatineCardMainForm.asObservable()

    this.patientFormSub = this.PatineCardMainForm$
      .subscribe(data => {
        this.patientForm = data
        this.patientSecondDeseases = this.patientForm.get('secondDeseases') as FormArray
        this.patientStages = this.patientForm.get('stages') as FormArray
        this.patientBlot = this.patientForm.get('blots') as FormArray
    })
  }

  delBlot(blotId: number) {
    console.log('blotId - ', blotId);
    this.patientService.delPatientBlot(this.Id, blotId)
    .subscribe();
    location.reload();
  }

  giveSdForUpd(sd: object[]){
    sd.forEach(e => {
      this.sdForUpd.push(e)
    });
  }

  giveStageForUpd(stage: object[]){
    stage.forEach(e => {
      this.stageForUpd.push(e)
    });
  }

  giveBlotForUpd(blot: object[]){
    blot.forEach(e => {
      this.blotForUpd.push(e)
    });
  }

  leaveComponent(name: string){

    console.log(this.patientForm.valid);
    
    if(this.patientForm.valid){
      this.router.navigate([name]);
    } else{
      confirm('Данные не верны!')
    }
  }

  ngOnDestroy() {
    if(this.sdForUpd.length != 0 || this.stageForUpd.length != 0 || this.blotForUpd.length != 0){
      if(confirm('Сохранить изменения?')){

        if(this.sdForUpd.length != 0){
          this.sdForUpd.forEach(e => {
            this.patientService
            .updatePatientSecondDesease(e.patientId, e.startDate, e.endDate, e.deseas, e.oldStartDate, e.oldDeseas)
            .subscribe()
          })
        }

        if(this.stageForUpd.length != 0){
          this.stageForUpd.forEach(e => {
            this.patientService
            .updatePatientStage(e.patientId, e.StageDate, e.StageDateOld, e.StageName)
            .subscribe()
          })
        }

        if(this.blotForUpd.length != 0){
          this.blotForUpd.forEach(e => {
            this.patientService
            .updatePatientBlot(e.patientId, e.blotId, e.blotIdOld , e.blotNo, e.blotDate, e.ibResultId, e.checkPlaceId, e.first, e.last, e.flgIfa)
            .subscribe()
          })
        }

        if(true){
          stop
        }
      }
    }
  }
}
