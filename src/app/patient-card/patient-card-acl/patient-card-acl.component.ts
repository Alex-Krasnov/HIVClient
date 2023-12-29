import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PatientCardAclModel } from 'src/app/_interfaces/patient-card-acl.model';
import { PatientCardAclService } from 'src/app/services/patient-card-acl.service';
import { PatientCardAclForm } from './patient-card-acl-form.model';

@Component({
  selector: 'app-patient-card-acl',
  templateUrl: './patient-card-acl.component.html',
  styleUrls: ['./patient-card-acl.component.css']
})
export class PatientCardAclComponent implements OnInit {
    private PatineCardResistenceForm: BehaviorSubject<FormGroup | undefined>
    PatineCardResistenceForm$: Observable<FormGroup>
    
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
      private route: ActivatedRoute,
      private patientService: PatientCardAclService,
      private fb: FormBuilder,
      private router: Router
    ){}
  
    ngOnInit() {
      this.route.params.subscribe(params => { this.Id = params['id'] })
      this.getData()
    }
  
    getData(): void {
      this.patientService.getData(this.Id)
        .subscribe((data:PatientCardAclModel) => {
          this.patient = data;
          this.initForm();
        });
    }
  
    initForm(){
      this.PatineCardResistenceForm = new BehaviorSubject(this.fb.group(new PatientCardAclForm(this.patient)));
      this.PatineCardResistenceForm$ = this.PatineCardResistenceForm.asObservable();
  
      this.patientFormSub = this.PatineCardResistenceForm$.subscribe(data => {this.patientForm = data;});
      
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
  }