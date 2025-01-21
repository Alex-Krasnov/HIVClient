import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PatientCardAclModel } from 'src/app/_interfaces/patient-card-acl.model';
import { PatientCardFilesModel } from 'src/app/_interfaces/patient-card-files.model';
import { PatientCardFilesService } from 'src/app/services/patient-card/patient-card-files.service';
import { PatientCardFilesForm } from './patient-card-files-form.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-patient-files',
  templateUrl: './patient-card-files.component.html',
  styleUrls: ['./patient-card-files.component.css']
})
export class PatientCardFilesComponent implements OnInit {
  private PatineCardFilesForm: BehaviorSubject<FormGroup | undefined>
  PatineCardFilesForm$: Observable<FormGroup>
  
  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu: boolean = false;
  isVisibleAddit: boolean = false;

  Id: number;
  patient: PatientCardFilesModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;

  patientFiles = new FormArray([]);
  fIsValid: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientCardFilesService,
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
      .subscribe((data:PatientCardFilesModel) => {
        this.patient = data;
        this.initForm();
      });
  }

  initForm(){
    this.PatineCardFilesForm = new BehaviorSubject(this.fb.group(new PatientCardFilesForm(this.patient)));
    this.PatineCardFilesForm$ = this.PatineCardFilesForm.asObservable();

    this.patientFormSub = this.PatineCardFilesForm$
      .subscribe(data => {
        this.patientForm = data;
    });
    
    this.patient.files.map(
      (item: any) => {
        const sForm = new FormGroup ({
          filePath: new FormControl({value: item, disabled: true})
        });
        this.patientFiles.push(sForm);
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

  giveFileForUpd(isValid: boolean){
    this.fIsValid = isValid;    
  }

  openReferalAnalysis(){
    this.modal.referalAnalysisOpen()
  }
}
