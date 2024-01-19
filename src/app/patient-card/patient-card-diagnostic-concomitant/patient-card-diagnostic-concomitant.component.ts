import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PatientCardDiagnosticConcomitantModel } from 'src/app/_interfaces/patient-card-diagnostic-concomitant.model';
import { PatientCardDiagnosticConcomitantService } from 'src/app/services/patient-card-diagnostic-concomitant.service';
import { PatientCardDiagnosticConcomitantForm } from './patient-card-diagnostic-concomintant-form.model';
import { ModalService } from 'src/app/services/modal.service';


@Component({
  selector: 'app-patient-card-diagnostic-concomitant',
  templateUrl: './patient-card-diagnostic-concomitant.component.html',
  styleUrls: ['./patient-card-diagnostic-concomitant.component.css']
})
export class PatientCardDiagnosticConcomitantComponent implements OnInit {
  private PatineCardDiagnosticConcomitantForm: BehaviorSubject<FormGroup | undefined>
  PatineCardDiagnosticConcomitantForm$: Observable<FormGroup>
  
  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu:boolean = false;
  isVisibleAddit:boolean = false;

  Id: number;
  patient: PatientCardDiagnosticConcomitantModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;

  patientHepCIfas = new FormArray([]);
  patientHepBIfas = new FormArray([]);
  patientSiphilisIfas = new FormArray([]);
  patientToxIggs = new FormArray([]);
  patientToxIgms = new FormArray([]);
  patientHepBPcrs = new FormArray([]);
  patientHepCPcrs = new FormArray([]);
  patientVpchs = new FormArray([]);

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientCardDiagnosticConcomitantService,
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
      .subscribe((data:PatientCardDiagnosticConcomitantModel) => {
        this.patient = data;
        this.initForm();
      });
  }

  initForm(){
    this.PatineCardDiagnosticConcomitantForm = new BehaviorSubject(this.fb.group(new PatientCardDiagnosticConcomitantForm(this.patient)));
    this.PatineCardDiagnosticConcomitantForm$ = this.PatineCardDiagnosticConcomitantForm.asObservable();

    this.patientFormSub = this.PatineCardDiagnosticConcomitantForm$.subscribe(data => {this.patientForm = data;});
    
    this.patient.hepCIfas.map(
      (item: any) => {
        const sForm = new FormGroup ({
          date: new FormControl({value: item.date, disabled: true}),
          result: new FormControl({value: item.result, disabled: true})
        });
        this.patientHepCIfas.push(sForm);
      }
    );

    this.patient.hepBIfas.map(
      (item: any) => {
        const sForm = new FormGroup ({
          date: new FormControl({value: item.date, disabled: true}),
          result: new FormControl({value: item.result, disabled: true})
        });
        this.patientHepBIfas.push(sForm);
      }
    );

    this.patient.siphilisIfas.map(
      (item: any) => {
        const sForm = new FormGroup ({
          date: new FormControl({value: item.date, disabled: true}),
          result: new FormControl({value: item.result, disabled: true})
        });
        this.patientSiphilisIfas.push(sForm);
      }
    );

    this.patient.toxIggs.map(
      (item: any) => {
        const sForm = new FormGroup ({
          date: new FormControl({value: item.date, disabled: true}),
          result: new FormControl({value: item.result, disabled: true})
        });
        this.patientToxIggs.push(sForm);
      }
    );

    this.patient.toxIgms.map(
      (item: any) => {
        const sForm = new FormGroup ({
          date: new FormControl({value: item.date, disabled: true}),
          result: new FormControl({value: item.result, disabled: true})
        });
        this.patientToxIgms.push(sForm);
      }
    );

    this.patient.hepBPcrs.map(
      (item: any) => {
        const sForm = new FormGroup ({
          date: new FormControl({value: item.date, disabled: true}),
          result: new FormControl({value: item.result, disabled: true}),
          resultDescr: new FormControl({value: item.resultDescr, disabled: true})
        });
        this.patientHepBPcrs.push(sForm);
      }
    );

    this.patient.vpchs.map(
      (item: any) => {
        const sForm = new FormGroup ({
          date: new FormControl({value: item.date, disabled: true}),
          result: new FormControl({value: item.result, disabled: true}),
          resultDescr: new FormControl({value: item.resultDescr, disabled: true})
        });
        this.patientVpchs.push(sForm);
      }
    );

    this.patient.hepCPcrs.map(
      (item: any) => {
        const sForm = new FormGroup ({
          date: new FormControl({value: item.date, disabled: true}),
          result: new FormControl({value: item.result, disabled: true}),
          resultDescr: new FormControl({value: item.resultDescr, disabled: true}),
          p0025: new FormControl({value: item.p0025, disabled: true}),
          p0025R: new FormControl({value: item.p0025R, disabled: true})
        });
        this.patientHepCPcrs.push(sForm);
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