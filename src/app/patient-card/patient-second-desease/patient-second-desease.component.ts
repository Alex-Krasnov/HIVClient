import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, merge } from 'rxjs';
import { PatientCardMainService } from 'src/app/services/patient-card-main.service';

@Component({
  selector: 'app-patient-second-desease',
  templateUrl: './patient-second-desease.component.html',
  styleUrls: ['./patient-second-desease.component.css']
})
export class PatientSecondDeseaseComponent implements OnInit, OnDestroy{
  formSd: FormGroup;
  pervValue: any;
  @Input() deseasArr: FormArray; 
  @Input() patientId: number;
  @Output() sdForUpd = new EventEmitter<object[]>();

  constructor(
    private patientService: PatientCardMainService,
    private fb: FormBuilder
  ){}

  ngOnInit() {
    this.formSd = this.fb.group({
      secondDeseases: this.deseasArr as FormArray,
      newStartDate: new FormControl(),
      newEndDate: new FormControl(),
      newDeseas: new FormControl()
    });
    this.pervValue = this.deseasArr.value as FormArray;
  }

  get secondDeseases() {
    return this.formSd.get('secondDeseases') as FormArray;
  }

  delSecondDeseases(index: number) {
    let e = this.secondDeseases.at(index);
    this.patientService.delPatientSecondDesease(this.patientId, e.get('startDate').value, e.get('deseas').value).subscribe(); 
    this.secondDeseases.removeAt(index);
  }

  createSecondDeseases(){
    let StartDate = this.formSd.get('newStartDate').value
    let EndDate = this.formSd.get('newEndDate').value
    let Deseas = this.formSd.get('newDeseas').value

    const desForm = new FormGroup ({
      startDate: new FormControl(StartDate),
      endDate: new FormControl(EndDate),
      deseas: new FormControl(Deseas)
    });

    this.patientService.createPatientSecondDesease(this.patientId, StartDate, EndDate, Deseas)
    .subscribe()

    this.secondDeseases.push(desForm)

    this.formSd.get('newStartDate').setValue('')
    this.formSd.get('newEndDate').setValue('')
    this.formSd.get('newDeseas').setValue('')
    this.formSd.get('newStartDate').markAsPristine()
    this.formSd.get('newEndDate').markAsPristine()
    this.formSd.get('newDeseas').markAsPristine()
  }

  // chengeTraking(){
  //   merge(...this.deseasArr.controls.map((control: any, index: number) =>
  //     control.valueChanges.pipe(map(value => ({ rowIndex: index, value }))))
  //   ).subscribe(changes => { this.nextValue = changes });
  // }

  ngOnDestroy() {
    let oldValue = this.pervValue;
    let curValue = this.formSd.controls['secondDeseases'].value;

    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue))){
      var forUpd = [];

      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          forUpd.push({
            patientId: this.patientId,
            startDate: curValue[index].startDate, 
            endDate: curValue[index].endDate, 
            deseas: curValue[index].deseas, 
            oldStartDate: oldValue[index].startDate, 
            oldDeseas: oldValue[index].deseas
          });
        }
      } 
      this.sdForUpd.emit(forUpd);
    }
  }
}