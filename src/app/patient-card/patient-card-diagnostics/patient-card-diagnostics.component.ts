import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PatientCardDiagnosticsModel } from 'src/app/_interfaces/patient-card-diagnostics.model';
import { PatientCardDiagnosticsService } from 'src/app/services/patient-card/patient-card-diagnostics.service';
import { PatientCardDiagnosticsForm } from './patient-card-diagnostics-form.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-patient-card-diagnostics',
  templateUrl: './patient-card-diagnostics.component.html',
  styleUrls: ['./patient-card-diagnostics.component.css']
})
export class PatientCardDiagnosticsComponent implements OnInit {
  private PatineCardDiagnosticsForm: BehaviorSubject<FormGroup | undefined>
  PatineCardDiagnosticsForm$: Observable<FormGroup>
  
  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu:boolean = false;
  isVisibleAddit:boolean = false;

  Id: number;
  patient: PatientCardDiagnosticsModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;

  patientVirusLoad = new FormArray([]);
  patientVirusLoadQual = new FormArray([]);
  patientCMV = new FormArray([]);
  patientIHL = new FormArray([]);
  patientImStat = new FormArray([]);
  patientImStatCD348 = new FormArray([]);

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientCardDiagnosticsService,
    private fb: FormBuilder,
    public modal: ModalService,
    private router: Router
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => { this.Id = params['id'] })
    this.getData()
  }

  getData(): void {
    this.patientService.getData(this.Id)
      .subscribe((data:PatientCardDiagnosticsModel) => {
        this.patient = data;
        this.initForm();
      });
  }

  initForm(){
    this.PatineCardDiagnosticsForm = new BehaviorSubject(this.fb.group(new PatientCardDiagnosticsForm(this.patient)));
    this.PatineCardDiagnosticsForm$ = this.PatineCardDiagnosticsForm.asObservable();

    this.patientFormSub = this.PatineCardDiagnosticsForm$.subscribe(data => {this.patientForm = data;});
    
    this.patient.virusLoads.map(
        (item: any) => {
          const sForm = new FormGroup ({
            date: new FormControl({value: item.date, disabled: true}),
            result: new FormControl({value: item.result, disabled: true}),
            resultDescr: new FormControl({value: item.resultDescr, disabled: true})
          });
          this.patientVirusLoad.push(sForm);
        }
    );

    this.patient.virusLoadsQuals.map(
      (item: any) => {
        const sForm = new FormGroup ({
          date: new FormControl({value: item.date, disabled: true}),
          result: new FormControl({value: item.result, disabled: true})
        });
        this.patientVirusLoadQual.push(sForm);
      }
    );

    this.patient.cmVs.map(
      (item: any) => {
        const sForm = new FormGroup ({
          date: new FormControl({value: item.date, disabled: true}),
          result: new FormControl({value: item.result, disabled: true}),
          resultDescr: new FormControl({value: item.resultDescr, disabled: true})
        });
        this.patientCMV.push(sForm);
      }
    );

    this.patient.ihLs.map(
      (item: any) => {
        const sForm = new FormGroup ({
          date: new FormControl({value: item.date, disabled: true}),
          result: new FormControl({value: item.result, disabled: true})
        });
        this.patientIHL.push(sForm);
      }
    );

    this.patient.imStats.map(
      (item: any) => {
        const sForm = new FormGroup ({
          date: new FormControl({value: item.date, disabled: true}),
          result: new FormControl({value: item.result, disabled: true}),
          resultDescr: new FormControl({value: item.resultPercent, disabled: true})
        });
        this.patientImStat.push(sForm);
      }
    );

    this.patient.imStatCD348s.map(
      (item: any) => {
        const sForm = new FormGroup ({
          date: new FormControl({value: item.date, disabled: true}),
          resultCD3: new FormControl({value: item.resultCD3, disabled: true}),
          resultCD4: new FormControl({value: item.resultCD4, disabled: true}),
          resultCD8: new FormControl({value: item.resultCD8, disabled: true}),
          resultCD4CD8: new FormControl({value: item.resultCD4CD8, disabled: true}),
          resultCD4Percent: new FormControl({value: item.resultCD4Percent, disabled: true}),
          resultCD8Percent: new FormControl({value: item.resultCD8Percent, disabled: true})
        });
        this.patientImStatCD348.push(sForm);
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
      case "Дополнительно":
        this.isVisibleAddit = !this.isVisibleAddit;
        break;
    } 
  }

  leaveComponent(name: string){
    if(true){
      if(name == '/main'){
        this.router.navigate([name]);
        return null
      }
      this.router.navigate([name+this.Id])
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

  openReferalAnalysis(){
    this.modal.referalAnalysisOpen()
  }
}