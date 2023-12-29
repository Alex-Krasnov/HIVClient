import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PatientCardJailModel } from 'src/app/_interfaces/patient-card-jail.model';
import { ListService } from 'src/app/services/list.service';
import { PatientCardJailService } from 'src/app/services/patient-card-jail.service';
import { InList } from 'src/app/validators/in-lst';
import { PatientCardJailForm } from './patient-card-jail-form.model';

@Component({
  selector: 'app-patient-card-jail',
  templateUrl: './patient-card-jail.component.html',
  styleUrls: ['./patient-card-jail.component.css']
})
export class PatientCardJailComponent implements OnInit {
  private PatineCardJailForm: BehaviorSubject<FormGroup | undefined>
  PatineCardJailForm$: Observable<FormGroup>
  
  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu:boolean = false;
  isVisibleAddit:boolean = false;
  sIsValid: boolean = true;
  IsErr: boolean = false;
  needUpd: boolean = false;

  Id: number;
  patient: PatientCardJailModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;
  patientJails = new FormArray([]);
  pervValue: object;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientCardJailService,
    private fb: FormBuilder,
    private router: Router,
    private listService: ListService
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => { this.Id = params['id'] })
    this.getData()
  }

  getData(): void {
    this.patientService.getData(this.Id)
      .subscribe((data:PatientCardJailModel) => {
        this.patient = data;
        this.initForm();
        this.pervValue = {
          patientId: this.Id,
          jailName: data.jailName,
          jailOffRegion: data.jailOffRegion,
          employmentName: data.jailOffDate
        }
      });
  }

  initForm(){
    this.PatineCardJailForm = new BehaviorSubject(this.fb.group(new PatientCardJailForm(this.patient, this.listService)));
    this.PatineCardJailForm$ = this.PatineCardJailForm.asObservable();

    this.patientFormSub = this.PatineCardJailForm$
      .subscribe(data => {
        this.patientForm = data;
    });

    this.patient.jails.map(
        (item: any) => {
          const sForm = new FormGroup ({
            jailStart: new FormControl(item.jailStart, Validators.required),
            jailEnd: new FormControl(item.jailEnd, Validators.required),
            jailName: new FormControl(item.jailName, {
              asyncValidators: [InList.validateJail(this.listService)],
              updateOn: 'blur'
            }),
            jailLeavName: new FormControl(item.jailLeavName, {
              asyncValidators: [InList.validateJail(this.listService)],
              updateOn: 'blur'
            })
          });
          this.patientJails.push(sForm);
        }
    );

    this.patientForm.statusChanges.subscribe( (status) => {
      if(status == 'VALID')
        this.needUpd = true;
    })
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

  givesForUpd(isValid: boolean){
     this.sIsValid = isValid;
  }
  

  updatePatient(){
    let curValue = {
      patientId: this.patientForm.controls['patientId'].value,
      jailName: this.patientForm.controls['jailName'].value,
      jailOffRegion: this.patientForm.controls['jailOffRegion'].value,
      jailOffDate: this.patientForm.controls['jailOffDate'].value
    };
    
    if(!(JSON.stringify(this.pervValue) === JSON.stringify(curValue))){
      this.patientService.updatePatient(curValue.patientId, curValue.jailName, curValue.jailOffRegion, curValue.jailOffDate).subscribe()

      this.pervValue = {
        patientId: this.Id,
        jailName: curValue.jailName,
        jailOffRegion: curValue.jailOffRegion,
        jailOffDate: curValue.jailOffDate
      };

      this.patientForm.markAsPristine()
    }
  }

  leaveComponent(name: string){
    if(this.patientForm.valid && this.sIsValid){
      if(this.needUpd)
        this.updatePatient()
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
