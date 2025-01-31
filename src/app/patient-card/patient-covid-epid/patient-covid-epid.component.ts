import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { PatientCardEpidService } from 'src/app/services/patient-card/patient-card-epid.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-patient-covid-epid',
  templateUrl: './patient-covid-epid.component.html',
  styleUrls: ['./patient-covid-epid.component.css']
})
export class PatientCovidEpidComponent implements OnInit{
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
      covids: this.subArr as FormArray,
      newCovidId: new FormControl(),
      newDPositivRes: new FormControl(),
      newDNegativeRes: new FormControl(),
      newCovidMKB: new FormControl('', {
        asyncValidators: [InList.validateMkb10Covid(this.listService)],
        updateOn: 'blur'
      })
    }, {updateOn: 'blur'});
    this.pervValue = this.subArr.value as FormArray;
    
    this.formS.controls['covids'].statusChanges.subscribe(() => {
      console.log(this.formS.controls['covids'].status);
      
      if (this.formS.controls['covids'].valid){
        this.updateCovid();
        this.isValid.emit(true);
      } else 
        this.isValid.emit(false);
    })
  }

  get covids() {
     return this.formS.get('covids') as FormArray;
  }

  async createCovid() {
    let dPositivRes = this.formS.get('newDPositivRes').value
    let dNegativeRes = this.formS.get('newDNegativeRes').value
    let covidMKB = this.formS.get('newCovidMKB').value
    
    if(this.formS.controls['newCovidMKB'].valid){
      
      let covidId  =  await firstValueFrom(this.patientService.createCovid(this.patientId, dPositivRes, dNegativeRes, covidMKB))
      
      const sForm = new FormGroup ({
        covidId: new FormControl(covidId),
        dPositivRes: new FormControl(dPositivRes),
        dNegativeRes: new FormControl(dNegativeRes),
        covidMKB: new FormControl(covidMKB, {
          asyncValidators: [InList.validateMkb10Covid(this.listService)],
          updateOn: 'blur'
        })
      });
      const sData ={
        covidId: covidId,
        dPositivRes: dPositivRes,
        dNegativeRes: dNegativeRes,
        covidMKB: covidMKB
      }
      
      this.covids.push(sForm)
      this.isValid.emit(true);
      this.pervValue.push(sData)
    }
    this.formS.get('newDPositivRes').setValue('')
    this.formS.get('newDPositivRes').markAsPristine()
    this.formS.get('newDNegativeRes').setValue('')
    this.formS.get('newDNegativeRes').markAsPristine()
    this.formS.get('newCovidMKB').setValue('')
    this.formS.get('newCovidMKB').markAsPristine()
  }

  updateCovid(){
    let oldValue = this.pervValue;
    let curValue = this.formS.controls['covids'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          this.patientService.updateCovid
          (
            curValue[index].covidMKB,
            curValue[index].dPositivRes,
            curValue[index].dNegativeRes,
            curValue[index].covidId
          ).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }
}
