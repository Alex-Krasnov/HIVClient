import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PatientCardResistenceService } from 'src/app/services/patient-card-resistence.service';
import { PatientCardResistenceForm } from './patient-card-resistence-form.model';
import { PatientCardResistenceModel } from 'src/app/_interfaces/patient-card-resistence.model';

@Component({
  selector: 'app-patient-card-resistence',
  templateUrl: './patient-card-resistence.component.html',
  styleUrls: ['./patient-card-resistence.component.css']
})
export class PatientCardResistenceComponent implements OnInit {
  private PatineCardResistenceForm: BehaviorSubject<FormGroup | undefined>
  PatineCardResistenceForm$: Observable<FormGroup>
  
  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu:boolean = false;

  Id: number;
  patient: PatientCardResistenceModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;

  patientResistence = new FormArray([]);

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientCardResistenceService,
    private fb: FormBuilder,
    private router: Router
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => { this.Id = params['id'] })
    this.getData()
  }

  getData(): void {
    this.patientService.getData(this.Id)
      .subscribe((data:PatientCardResistenceModel) => {
        this.patient = data;
        this.initForm();
      });
  }

  initForm(){
    this.PatineCardResistenceForm = new BehaviorSubject(this.fb.group(new PatientCardResistenceForm(this.patient)));
    this.PatineCardResistenceForm$ = this.PatineCardResistenceForm.asObservable();

    this.patientFormSub = this.PatineCardResistenceForm$.subscribe(data => {this.patientForm = data;});
    
    this.patient.resistences.map(
        (item: any) => {
          const sForm = new FormGroup ({
            date: new FormControl({value: item.date, disabled: true}),
            lr001: new FormControl({value: item.lr001, disabled: true}),
            lr005: new FormControl({value: item.lr005, disabled: true}),
            lr010: new FormControl({value: item.lr010, disabled: true}),
            lr015: new FormControl({value: item.lr015, disabled: true}),
            lr020: new FormControl({value: item.lr020, disabled: true}),
            lr025: new FormControl({value: item.lr025, disabled: true}),
            lr030: new FormControl({value: item.lr030, disabled: true}),
            lr035: new FormControl({value: item.lr035, disabled: true}),
            lr040: new FormControl({value: item.lr040, disabled: true}),
            lr045: new FormControl({value: item.lr045, disabled: true}),
            lr050: new FormControl({value: item.lr050, disabled: true}),
            lr055: new FormControl({value: item.lr055, disabled: true}),
            lr060: new FormControl({value: item.lr060, disabled: true}),
            lr065: new FormControl({value: item.lr065, disabled: true}),
            lr070: new FormControl({value: item.lr070, disabled: true}),
            lr075: new FormControl({value: item.lr075, disabled: true}),
            lr080: new FormControl({value: item.lr080, disabled: true}),
            lr085: new FormControl({value: item.lr085, disabled: true}),
            lr090: new FormControl({value: item.lr090, disabled: true}),
            lr095: new FormControl({value: item.lr095, disabled: true}),
            lr100: new FormControl({value: item.lr100, disabled: true}),
            lr105: new FormControl({value: item.lr105, disabled: true}),
            lr110: new FormControl({value: item.lr110, disabled: true})
          });
          this.patientResistence.push(sForm);
        }
    );
  }

  openDropdown(str:string): void{
    console.log(str);
      
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
}