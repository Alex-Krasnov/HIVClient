import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PatientCardTreatmentModel } from 'src/app/_interfaces/patient-card-treatment.model';
import { ListService } from 'src/app/services/list.service';
import { PatientCardTreatmentService } from 'src/app/services/patient-card-treatment.service';
import { PatientCardTreatmentForm } from './patient-card-treatment-form.model';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-patient-card-treatment',
  templateUrl: './patient-card-treatment.component.html',
  styleUrls: ['./patient-card-treatment.component.css']
})
export class PatientCardTreatmentComponent implements OnInit{
  private PatineCardTreatmentForm: BehaviorSubject<FormGroup | undefined>
  PatineCardTreatmentForm$: Observable<FormGroup>
  
  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu:boolean = false;

  Id: number;
  patient: PatientCardTreatmentModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;
  patientCorrespIllnesses = new FormArray([]);
  patientCureSchemas = new FormArray([]);
  patientHospResultRs = new FormArray([]);

  constructor(
    private route: ActivatedRoute,
    private patientTreatmentService: PatientCardTreatmentService,
    private fb: FormBuilder,
    private router: Router,
    private listService: ListService,
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => { this.Id = params['id'] })
    this.getData()
  }

  getData(): void {
    this.patientTreatmentService.getData(this.Id)
      .subscribe((data:PatientCardTreatmentModel) => {
        this.patient = data;
        this.initForm();
      });
  }

  initForm(){
    this.PatineCardTreatmentForm = new BehaviorSubject(this.fb.group(new PatientCardTreatmentForm(this.patient, this.listService)));
    this.PatineCardTreatmentForm$ = this.PatineCardTreatmentForm.asObservable();

    this.patientFormSub = this.PatineCardTreatmentForm$
      .subscribe(data => {
        this.patientForm = data;
    });

    this.patient.correspIllnesses.map(
        (cor: any) => {
          const corForm = new FormGroup ({
            correspIllness: new FormControl(cor.correspIllness, {
              asyncValidators: [InList.validateCorrespIllnesses(this.listService)],
              updateOn: 'blur'
            }),
            correspIllnessDate: new FormControl(cor.correspIllnessDate)
          });
          this.patientCorrespIllnesses.push(corForm);
        }
    );

    this.patient.cureSchemas.map(
      (cur: any) => {
        const curForm = new FormGroup ({
          cureSchemaName: new FormControl(cur.cureSchemaName, {
            asyncValidators: [InList.validateCureSchemaName(this.listService)],
            updateOn: 'blur'
          }),
          cureChangeName: new FormControl(cur.cureChangeName, {
            asyncValidators: [InList.validateCureChangeName(this.listService)],
            updateOn: 'blur'
          }),
          rangeTherapy: new FormControl(cur.rangeTherapy, {
            asyncValidators: [InList.validateRangeTherapy(this.listService)],
            updateOn: 'blur'
          }),
          startDate: new FormControl(cur.startDate),
          endDate: new FormControl(cur.endDate),
          schemaComm: new FormControl(cur.schemaComm),
          protNum: new FormControl(cur.protNum),
          last: new FormControl(cur.last)
        });
        this.patientCureSchemas.push(curForm);
      }
    );

    this.patient.hospResultRs.map(
      (hosp: any) => {
        const curForm = new FormGroup ({
          lpuName: new FormControl(hosp.lpuName, {
            asyncValidators: [InList.validateLpuName(this.listService)],
            updateOn: 'blur'
          }),
          hospCourseName: new FormControl(hosp.hospCourseName, {
            asyncValidators: [InList.validateHospCourseName(this.listService)],
            updateOn: 'blur'
          }),
          hospResult: new FormControl(hosp.hospResult, {
            asyncValidators: [InList.validateHospResult(this.listService)],
            updateOn: 'blur'
          }),
          dateHospIn: new FormControl(hosp.dateHospIn),
          dateHospOut: new FormControl(hosp.dateHospOut)
        });
        this.patientHospResultRs.push(curForm);
      }
    );
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

  leaveComponent(name: string){
    // if(this.patientForm.valid){
    //   if(this.needUpd)
    //     this.updatePatient()
    //   if(name == '/main'){
    //     this.router.navigate([name]);
    //     return null
    //   }
    //   this.router.navigate([name+this.Id])
    // } else{
    //   Object.keys(this.patientForm.controls).forEach(
    //     (data: any) => {
    //       if(this.patientForm.controls[data].invalid)
    //         console.log(data);          
    //     }
    //   )
    //   confirm(`Ошибка в заполнении данных!`)
    // }
  }
}
