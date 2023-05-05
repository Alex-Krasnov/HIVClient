import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PatientCardRecipeModel } from 'src/app/_interfaces/patient-card-recipe.model';
import { ListService } from 'src/app/services/list.service';
import { PatientCardRecipeService } from 'src/app/services/patient-card-recipe.service';
import { InList } from 'src/app/validators/in-lst';
import { PatientCardRecipeForm } from './patient-card-recipe-form.model';

@Component({
  selector: 'app-patient-card-recipe',
  templateUrl: './patient-card-recipe.component.html',
  styleUrls: ['./patient-card-recipe.component.css']
})
export class PatientCardRecipeComponent implements OnInit {
  private PatineCardForm: BehaviorSubject<FormGroup | undefined>
  PatineCardForm$: Observable<FormGroup>
  
  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu:boolean = false;
  rIsValid: boolean = true;
  IsErr: boolean = false;
  needUpd: boolean = false;

  Id: number;
  type1 = 'vl';
  type2 = 'hc';
  type3 = 'hb';
  patient: PatientCardRecipeModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;

  patientRecipes = new FormArray([]);

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientCardRecipeService,
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
      .subscribe((data:PatientCardRecipeModel) => {
        this.patient = data;
        this.initForm();
      });
  }

  initForm(){
    this.PatineCardForm = new BehaviorSubject(this.fb.group(new PatientCardRecipeForm(this.patient)));
    this.PatineCardForm$ = this.PatineCardForm.asObservable();

    this.patientFormSub = this.PatineCardForm$
      .subscribe(data => {
        this.patientForm = data;
    });

    this.patient.recipes.map(
        (item: any) => {
          const sForm = new FormGroup ({
            ser: new FormControl(item.ser),
            num: new FormControl(item.num),
            prescrDate: new FormControl(item.prescrDate),
            doctor: new FormControl(item.doctor, {
              asyncValidators: [InList.validateDoctor(this.listService)],
              updateOn: 'blur'
            }),
            medicine: new FormControl(item.medicine, {
              asyncValidators: [InList.validateMedicine(this.listService)],
              updateOn: 'blur'
            }),
            packNum: new FormControl(item.packNum),
            finSource: new FormControl(item.finSource, {
              asyncValidators: [InList.validateFinSource(this.listService)],
              updateOn: 'blur'
            }),
            giveDate: new FormControl(item.giveDate),
            giveDateCheck: new FormControl(item.giveDateCheck),
            medicineGive: new FormControl(item.medicineGive),
            packNumGive: new FormControl(item.packNumGive)
          });
          this.patientRecipes.push(sForm);
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
    } 
  }

  giveForUpd(isValid: boolean){
     this.rIsValid = isValid;
  }
  
  leaveComponent(name: string){
    if(this.rIsValid){
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
