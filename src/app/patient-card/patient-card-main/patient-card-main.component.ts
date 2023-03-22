import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientCardMainModel } from 'src/app/_interfaces/patient-card-main.model';
import { PatientCardMainService } from 'src/app/services/patient-card-main.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PatientCardMainForm } from './patient-card-main-form.model';
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-patient-card-main',
  templateUrl: './patient-card-main.component.html',
  styleUrls: ['./patient-card-main.component.css']
})
export class PatientCardMainComponent implements OnInit {
  private PatineCardMainForm: BehaviorSubject<FormGroup | undefined>
  PatineCardMainForm$: Observable<FormGroup>

  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu:boolean = false;
  bIsValid: boolean = true;
  sdIsValid: boolean = true;
  stageIsValid: boolean = true;
  Id: number;
  IsErr: boolean = false;

  patient: PatientCardMainModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;
  patientSecondDeseases = new FormArray([]);
  patientStages = new FormArray([]);
  patientBlot = new FormArray([]);


  constructor(
    private route: ActivatedRoute,
    private patientService: PatientCardMainService,
    private fb: FormBuilder,
    private router: Router,
    private listService: ListService,
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

  deletePatient(){
    
    if(confirm(`Вы уверены, что хотите удалить карту пациента?`)){
      console.log('delete');
      this.patientService.delPatientPatient(this.Id).subscribe()
      // this.route
    }
  }

  giveSdForUpd(isValid: boolean){
    this.sdIsValid = isValid;
  }

  giveStageForUpd(isValid: boolean){
    this.stageIsValid = isValid;
  }

  giveBlotForUpd(isValid: boolean){
    this.bIsValid = isValid;    
  }

  leaveComponent(name: string){

    if(this.patientForm.valid){
      this.router.navigate([name]);
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

  initForm(){
    this.PatineCardMainForm = new BehaviorSubject(this.fb.group(new PatientCardMainForm(this.patient, this.listService)));
    this.PatineCardMainForm$ = this.PatineCardMainForm.asObservable();

    this.patientFormSub = this.PatineCardMainForm$
      .subscribe(data => {
        this.patientForm = data;
    });

    this.patient.secondDeseases.map(
        (des: any) => {
          const desForm = new FormGroup ({
            startDate: new FormControl(des.startDate, Validators.required),
            endDate: new FormControl(des.endDate),
            deseas: new FormControl(des.deseas, {
              asyncValidators: [InList.validateDeseases(this.listService)],
              updateOn: 'blur'
            })
          });
          this.patientSecondDeseases.push(desForm);
        }
    );
    this.patient.stages.map(
      (e: any) => {
        const stageForm = new FormGroup ({
          stageDate: new FormControl(e.stageDate, Validators.required),
          stage: new FormControl(e.stage, {
            asyncValidators: [InList.validateStage(this.listService)],
            updateOn: 'blur'
          })
        });
        this.patientStages.push(stageForm);
      }
    );
    this.patient.blots.map(
      (e: any) => {
        const blotForm = new FormGroup ({
          blotId: new FormControl(e.blotId, [Validators.required, Validators.pattern("^[0-9]*$")]),
          blotNo: new FormControl(e.blotNo, Validators.pattern("^[0-9]*$")),
          blotDate: new FormControl(e.blotDate),
          blotRes: new FormControl(e.blotRes, {
                asyncValidators: [InList.validateIbResult(this.listService)],
                updateOn: 'blur'
              }),
          checkPlace: new FormControl(e.checkPlace, {
                asyncValidators: [InList.validateCheckPlace(this.listService)],
                updateOn: 'blur'
              }),
          first: new FormControl(e.first),
          last: new FormControl(e.last),
          ifa: new FormControl(e.ifa),
          inputDate: new FormControl({value: e.inputDate, disabled: true})
        });
        this.patientBlot.push(blotForm);
      }
    );
  }
}
