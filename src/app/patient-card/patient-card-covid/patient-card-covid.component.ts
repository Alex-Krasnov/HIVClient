import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PatientCardCovidModel } from 'src/app/_interfaces/patient-card-covid.model';
import { ListService } from 'src/app/services/list.service';
import { PatientCardCovidService } from 'src/app/services/patient-card/patient-card-covid.service';
import { InList } from 'src/app/validators/in-lst';
import { PatientCardCovidForm } from './patient-card-covid-form.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-patient-card-covid',
  templateUrl: './patient-card-covid.component.html',
  styleUrls: ['./patient-card-covid.component.css']
})
export class PatientCardCovidComponent  implements OnInit {
  private PatineCardCovidForm: BehaviorSubject<FormGroup | undefined>
  PatineCardCovidForm$: Observable<FormGroup>
  
  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu:boolean = false;
  isVisibleAddit:boolean = false;
  cIsValid: boolean = true;
  oIsValid: boolean = true;
  pIsValid: boolean = true;
  IsErr: boolean = false;

  Id: number;
  type1 = 1;
  type2 = 2;
  patient: PatientCardCovidModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;
  patientOtherDiads = new FormArray([]);
  patientPatDiads = new FormArray([]);
  patientCovids = new FormArray([]);

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientCardCovidService,
    private fb: FormBuilder,
    private router: Router,
    public modal: ModalService,
    private listService: ListService
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => { this.Id = params['id'] })
    this.getData()
  }

  getData(): void {
    this.patientService.getData(this.Id)
      .subscribe((data:PatientCardCovidModel) => {
        this.patient = data;
        this.initForm();
      });
  }

  initForm(){
    this.PatineCardCovidForm = new BehaviorSubject(this.fb.group(new PatientCardCovidForm(this.patient)));
    this.PatineCardCovidForm$ = this.PatineCardCovidForm.asObservable();

    this.patientFormSub = this.PatineCardCovidForm$
      .subscribe(data => {
        this.patientForm = data;
    });

    this.patient.otherDiags.forEach(item => {
      const sForm = new FormGroup ({
        id: new FormControl(item.id),
        comm: new FormControl(item.comm),
        nameShort: new FormControl(item.nameShort, {
          asyncValidators: [InList.validateFullMkb10Short(this.listService)],
          updateOn: 'blur'
        }),
        nameLong: new FormControl(item.nameLong, {
          asyncValidators: [InList.validateFullMkb10Long(this.listService)],
          updateOn: 'blur'
        })
      });
      this.patientOtherDiads.push(sForm);
    })

    this.patient.patDiags.forEach(item => {
      const sForm = new FormGroup ({
        id: new FormControl(item.id),
        comm: new FormControl(item.comm),
        nameShort: new FormControl(item.nameShort, {
          asyncValidators: [InList.validateFullMkb10Short(this.listService)],
          updateOn: 'blur'
        }),
        nameLong: new FormControl(item.nameLong, {
          asyncValidators: [InList.validateFullMkb10Long(this.listService)],
          updateOn: 'blur'
        })
      });
      this.patientPatDiads.push(sForm);
    })

    this.patient.covids.forEach(item => {
      const sForm = new FormGroup ({
        idCovid: new FormControl(item.idCovid),
        periodDesDate: new FormControl(item.periodDesDate),
        positiveResCovidDate: new FormControl(item.positiveResCovidDate),
        negativeResCovidDate: new FormControl(item.negativeResCovidDate),
        hospDate: new FormControl(item.hospDate),
        dischargeDate: new FormControl(item.dischargeDate),
        outPatTreat: new FormControl(item.outPatTreat, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        deathCovid: new FormControl(item.deathCovid, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        orit: new FormControl(item.orit, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        oxygen: new FormControl(item.oxygen, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        avl: new FormControl(item.avl, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        arterHyper: new FormControl(item.arterHyper, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        deabetes: new FormControl(item.deabetes, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        coronarySynd: new FormControl(item.coronarySynd, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        hobl: new FormControl(item.hobl, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        bronhAstma: new FormControl(item.bronhAstma, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        cancer: new FormControl(item.cancer, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        kidneyDes: new FormControl(item.kidneyDes, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        }),
        outcomeHosp: new FormControl(item.outcomeHosp, {
          asyncValidators: [InList.validateOutHosp(this.listService)],
          updateOn: 'blur'
        }),
        clinVarCovid: new FormControl(item.clinVarCovid, {
          asyncValidators: [InList.validateClinVarCovid(this.listService)],
          updateOn: 'blur'
        }),
        severityCovid: new FormControl(item.severityCovid, {
          asyncValidators: [InList.validateCourseCovid(this.listService)],
          updateOn: 'blur'
        }),
        covidMKB10Short: new FormControl(item.covidMKB10Short, {
          asyncValidators: [InList.validateMkb10CovidShort(this.listService)],
          updateOn: 'blur'
        }),
        covidMKB10Long: new FormControl(item.covidMKB10Long, {
          asyncValidators: [InList.validateMkb10CovidLong(this.listService)],
          updateOn: 'blur'
        }),
        tubercuosisShort: new FormControl(item.tubercuosisShort, {
          asyncValidators: [InList.validateMkbTuderShort(this.listService)],
          updateOn: 'blur'
        }),
        tubercuosisLong: new FormControl(item.tubercuosisLong, {
          asyncValidators: [InList.validateMkbTuderLong(this.listService)],
          updateOn: 'blur'
        }),
        pneumoniaShort: new FormControl(item.pneumoniaShort, {
          asyncValidators: [InList.validateMkbPneumoniaShort(this.listService)],
          updateOn: 'blur'
        }),
        pneumoniaLong: new FormControl(item.pneumoniaLong, {
          asyncValidators: [InList.validateMkbPneumoniaLong(this.listService)],
          updateOn: 'blur'
        }),
        typeAvl: new FormControl(item.typeAvl, {
          asyncValidators: [InList.validateAvlType(this.listService)],
          updateOn: 'blur'
        }),
        commitment: new FormControl(item.commitment, {
          asyncValidators: [InList.validateCommitment(this.listService)],
          updateOn: 'blur'
        }),
        comm: new FormControl(item.comm)
      });
      this.patientCovids.push(sForm);
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

  givecForUpd(isValid: boolean){
     this.cIsValid = isValid;
  }

  givepForUpd(isValid: boolean){
      this.pIsValid = isValid;
  }

 giveoForUpd(isValid: boolean){
    this.oIsValid = isValid;
  }
  
  leaveComponent(name: string){
    if(this.cIsValid && this.pIsValid && this.oIsValid){
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