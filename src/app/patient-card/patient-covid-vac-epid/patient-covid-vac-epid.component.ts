import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { PatientCardEpidService } from 'src/app/services/patient-card-epid.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-patient-covid-vac-epid',
  templateUrl: './patient-covid-vac-epid.component.html',
  styleUrls: ['./patient-covid-vac-epid.component.css']
})
export class PatientCovidVacEpidComponent implements OnInit{
  formS: FormGroup;
  pervValue: any;
  @Input() subArr: FormArray; 
  @Input() patientId: number;
  @Output() isValid = new EventEmitter<boolean>();

  constructor(
    private patientService: PatientCardEpidService,
    private fb: FormBuilder,
    private listService: ListService
  ){}

  ngOnInit() {
    this.isValid.emit(true);
    this.formS = this.fb.group({
      subs: this.subArr as FormArray,
      newVacId: new FormControl(),
      newDVac1: new FormControl(),
      newDVac2: new FormControl(),
      newVacName: new FormControl('', {
        asyncValidators: [InList.validateVac(this.listService)],
        updateOn: 'blur'
      })
    }, {updateOn: 'blur'});
    this.pervValue = this.subArr.value as FormArray;
    
    this.formS.controls['subs'].statusChanges.subscribe(() => {
      if (this.formS.controls['subs'].valid){
        this.updateCovidVac();
        this.isValid.emit(true);
      } else 
        this.isValid.emit(false);
    })
  }

  get subs() {
     return this.formS.get('subs') as FormArray;
  }

  delCovidVac(index: number) {
    let e = this.subs.at(index);
    this.patientService.delCovidVac(e.get('vacId').value).subscribe();
    this.pervValue.splice(index, 1);
    this.subs.removeAt(index);
  }

  async createCovidVac() {
    let dVac1 = this.formS.get('newDVac1').value
    let dVac2 = this.formS.get('newDVac2').value
    let vacName = this.formS.get('newVacName').value
    
    if(this.formS.controls['newVacName'].valid){
      
      let vacId  =  await firstValueFrom(this.patientService.createCovidVac(this.patientId, dVac1, dVac2, vacName))
      
      const sForm = new FormGroup ({
        vacId: new FormControl(vacId),
        dVac1: new FormControl(dVac1),
        dVac2: new FormControl(dVac2),
        vacName: new FormControl(vacName, {
          asyncValidators: [InList.validateVac(this.listService)],
          updateOn: 'blur'
        })
      });
      const sData ={
        vacId: vacId,
        dVac1: dVac1,
        dVac2: dVac2,
        vacName: vacName
      }
      
      this.subs.push(sForm)
      this.isValid.emit(true);
      this.pervValue.push(sData)
    }
    this.formS.get('newDVac1').setValue('')
    this.formS.get('newDVac1').markAsPristine()
    this.formS.get('newDVac2').setValue('')
    this.formS.get('newDVac2').markAsPristine()
    this.formS.get('newVacName').setValue('')
    this.formS.get('newVacName').markAsPristine()
  }

  updateCovidVac(){
    let oldValue = this.pervValue;
    let curValue = this.formS.controls['subs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          this.patientService.updateCovidVac
          (
            curValue[index].vacName,
            curValue[index].dVac1,
            curValue[index].dVac2,
            curValue[index].vacId
          ).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }
}