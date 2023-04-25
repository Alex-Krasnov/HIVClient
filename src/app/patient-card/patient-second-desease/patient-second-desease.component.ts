import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { PatientCardMainService } from 'src/app/services/patient-card-main.service';
import { InList } from 'src/app/validators/in-lst';

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
  // @Output() sdForUpd = new EventEmitter<object[]>();
  @Output() sdIsValid = new EventEmitter<boolean>();

  constructor(
    private patientService: PatientCardMainService,
    private fb: FormBuilder,
    private listService: ListService
  ){}

  ngOnInit() {
    this.sdIsValid.emit(true);
    this.formSd = this.fb.group({
      secondDeseases: this.deseasArr as FormArray,
      newStartDate: new FormControl(),
      newEndDate: new FormControl(),
      newDeseas: new FormControl('', {
        asyncValidators: [InList.validateDeseases(this.listService)],
        updateOn: 'blur'
      })
    }, {updateOn: 'blur'});
    this.pervValue = this.deseasArr.value as FormArray;

    this.formSd.controls['secondDeseases'].statusChanges.subscribe(() => {
      if (this.formSd.controls['secondDeseases'].valid){
        this.updateDesease();
        this.sdIsValid.emit(true);
      } else 
        this.sdIsValid.emit(false);
    })
  }

  get secondDeseases() {
    return this.formSd.get('secondDeseases') as FormArray;
  }

  delSecondDeseases(index: number) {
    let e = this.secondDeseases.at(index);
    this.patientService.delPatientSecondDesease(this.patientId, e.get('startDate').value, e.get('deseas').value).subscribe();
    this.pervValue.splice(index, 1);
    this.secondDeseases.removeAt(index);
  }

  createSecondDeseases(){
    let StartDate = this.formSd.get('newStartDate').value
    let EndDate = this.formSd.get('newEndDate').value
    let Deseas = this.formSd.get('newDeseas').value

    if(this.formSd.controls['newStartDate'].valid && 
        this.formSd.controls['newEndDate'].valid && 
        this.formSd.controls['newDeseas'].valid){
          
      const desForm = new FormGroup ({
        startDate: new FormControl(StartDate),
        endDate: new FormControl(EndDate),
        deseas: new FormControl(Deseas, {
          asyncValidators: [InList.validateDeseases(this.listService)],
          updateOn: 'blur'
        })
      });
      const desData ={
        startDate: StartDate,
        endDate: EndDate,
        deseas: Deseas
      }
  
      this.patientService.createPatientSecondDesease(this.patientId, StartDate, EndDate, Deseas)
      .subscribe()
  
      this.secondDeseases.push(desForm)
      this.pervValue.push(desData)
      this.sdIsValid.emit(true);
    }

    this.formSd.get('newStartDate').setValue('')
    this.formSd.get('newEndDate').setValue('')
    this.formSd.get('newDeseas').setValue('')
    this.formSd.get('newStartDate').markAsPristine()
    this.formSd.get('newEndDate').markAsPristine()
    this.formSd.get('newDeseas').markAsPristine()
  }

  updateDesease(){
    let oldValue = this.pervValue;
    let curValue = this.formSd.controls['secondDeseases'].value;

    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          
          this.patientService.updatePatientSecondDesease
          (
            this.patientId, 
            curValue[index].startDate, 
            curValue[index].endDate, 
            curValue[index].deseas, 
            oldValue[index].startDate, 
            oldValue[index].deseas
          ).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }

  // chengeTraking(){
  //   merge(...this.deseasArr.controls.map((control: any, index: number) =>
  //     control.valueChanges.pipe(map(value => ({ rowIndex: index, value }))))
  //   ).subscribe(changes => { this.nextValue = changes });
  // }

  ngOnDestroy() {}
}