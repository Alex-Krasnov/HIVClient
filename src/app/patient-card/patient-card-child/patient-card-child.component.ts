import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { PatientCardChildForm } from './patient-card-child-form.model';
import { ModalService } from 'src/app/services/modal.service';
import { PatientCardChildModel } from 'src/app/_interfaces/patient-card-child.model';
import { PatientCardChildService } from 'src/app/services/patient-card-child.service';

@Component({
  selector: 'app-patient-card-child',
  templateUrl: './patient-card-child.component.html',
  styleUrls: ['./patient-card-child.component.css']
})
export class PatientCardChildComponent implements OnInit {
  private PatineCardChildForm: BehaviorSubject<FormGroup | undefined>
  PatineCardChildForm$: Observable<FormGroup>
  
  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu:boolean = false;
  IsErr: boolean = false;
  needUpd: boolean = false;

  Id: number;
  patient: PatientCardChildModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;
  patientPregMs = new FormArray([]);
  pervValue: object;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientCardChildService,
    private fb: FormBuilder,
    private router: Router,
    private listService: ListService,
    public modal: ModalService
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => { this.Id = params['id'] })
    this.getData()
  }

  getData(): void {
    this.patientService.getData(this.Id)
      .subscribe((data:PatientCardChildModel) => {
        this.patient = data;
        this.initForm();
        this.pervValue = {
          patientId: this.Id,
          familyType: data.familyType,
          mId: data.mId,
          fId: data.fId,
          firstCheckDate: data.firstCheckDate,
          childPlace: data.childPlace,
          breastMonth: data.breastMonth,
          childPhp: data.childPhp,
          materHome: data.materHome,
          childDescr: data.childDescr,
          growth: data.growth,
          weight: data.weight,
          forma309: data.forma309,
          lastCareDate: data.lastCareDate,
          communicationParentDate: data.communicationParentDate,
          callingDistrictSpecDate: data.callingDistrictSpecDate,
          refusalPhp: data.refusalPhp,
          refusalResearch: data.refusalResearch,
          refusalTherapy: data.refusalTherapy
        }
      });
  }

  initForm(){
    this.PatineCardChildForm = new BehaviorSubject(this.fb.group(new PatientCardChildForm(this.patient, this.listService)));
    this.PatineCardChildForm$ = this.PatineCardChildForm.asObservable();

    this.patientFormSub = this.PatineCardChildForm$
      .subscribe(data => {
        this.patientForm = data;
    });

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

  updatePatient(){
    let curValue = {
      patientId: this.patientForm.controls['patientId'].value,
      familyType: this.patientForm.controls['familyType'].value,
      mId: this.patientForm.controls['mId'].value,
      fId: this.patientForm.controls['fId'].value,
      firstCheckDate: this.patientForm.controls['firstCheckDate'].value,
      childPlace: this.patientForm.controls['childPlace'].value,
      breastMonth: this.patientForm.controls['breastMonth'].value,
      childPhp: this.patientForm.controls['childPhp'].value,
      materHome: this.patientForm.controls['materHome'].value,
      childDescr: this.patientForm.controls['childDescr'].value,
      growth: this.patientForm.controls['growth'].value,
      weight: this.patientForm.controls['weight'].value,
      forma309: this.patientForm.controls['forma309'].value,
      lastCareDate: this.patientForm.controls['lastCareDate'].value,
      communicationParentDate: this.patientForm.controls['communicationParentDate'].value,
      callingDistrictSpecDate: this.patientForm.controls['callingDistrictSpecDate'].value,
      refusalPhp: this.patientForm.controls['refusalPhp'].value,
      refusalResearch: this.patientForm.controls['refusalResearch'].value,
      refusalTherapy: this.patientForm.controls['refusalTherapy'].value,
    };
    
    if(!(JSON.stringify(this.pervValue) === JSON.stringify(curValue))){
      this.patientService.updatePatient( curValue).subscribe()

      this.pervValue = {
        patientId: this.Id,
        familyType: curValue.familyType,
        mId: curValue.mId,
        fId: curValue.fId,
        firstCheckDate: curValue.firstCheckDate,
        childPlace: curValue.childPlace,
        breastMonth: curValue.breastMonth,
        childPhp: curValue.childPhp,
        materHome: curValue.materHome,
        childDescr: curValue.childDescr,
        growth: curValue.growth,
        weight: curValue.weight,
        forma309: curValue.forma309,
        lastCareDate: curValue.lastCareDate,
        communicationParentDate: curValue.communicationParentDate,
        callingDistrictSpecDate: curValue.callingDistrictSpecDate,
        refusalPhp: curValue.refusalPhp,
        refusalResearch: curValue.refusalResearch,
        refusalTherapy: curValue.refusalTherapy
      };

      this.patientForm.markAsPristine()
    }
  }

  leaveComponent(name: string){
    if(this.patientForm.valid){
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
