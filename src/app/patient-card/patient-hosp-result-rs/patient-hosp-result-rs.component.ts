import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { PatientCardTreatmentService } from 'src/app/services/patient-card-treatment.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-patient-hosp-result-rs',
  templateUrl: './patient-hosp-result-rs.component.html',
  styleUrls: ['./patient-hosp-result-rs.component.css']
})
export class PatientHospResultRsComponent implements OnInit{
  formHR: FormGroup;
  pervValue: any;
  @Input() hospResultArr: FormArray; 
  @Input() patientId: number;
  @Output() hrIsValid = new EventEmitter<boolean>();

  constructor(
    private patientService: PatientCardTreatmentService,
    private fb: FormBuilder,
    private listService: ListService
  ){}

  ngOnInit() {
    this.hrIsValid.emit(true);
    this.formHR = this.fb.group({
      hospResultRs: this.hospResultArr as FormArray,
      newLpuName: new FormControl('', {
        asyncValidators: [InList.validateLpuName(this.listService)],
        updateOn: 'blur'
      }),
      newHospCourseName: new FormControl('', {
        asyncValidators: [InList.validateHospCourseName(this.listService)],
        updateOn: 'blur'
      }),
      newHospResult: new FormControl('', {
        asyncValidators: [InList.validateHospResult(this.listService)],
        updateOn: 'blur'
      }),
      newDateHospIn: new FormControl(),
      newDateHospOut: new FormControl()
    }, {updateOn: 'blur'});
    this.pervValue = this.hospResultArr.value as FormArray;

    this.formHR.controls['hospResultRs'].statusChanges.subscribe(() => {
      if (this.formHR.controls['hospResultRs'].valid){
        this.updateHospResultRs();
        this.hrIsValid.emit(true);
      } else 
        this.hrIsValid.emit(false);
    })
  }

  get hospResultRs() {
    return this.formHR.get('hospResultRs') as FormArray;
  }

  delHospResultRs(index: number) {
    let e = this.hospResultRs.at(index);
    this.patientService.delHospResultRs(this.patientId, e.get('lpuName').value, e.get('dateHospIn').value).subscribe();
    this.pervValue.splice(index, 1);
    this.hospResultRs.removeAt(index);
  }

  createHospResultRs() {
    let name = this.formHR.get('newLpuName').value
    let date = this.formHR.get('newDateHospIn').value
    let hospCourseName = this.formHR.get('newHospCourseName').value
    let dateHospOut = this.formHR.get('newDateHospOut').value
    let hospResultName = this.formHR.get('newHospResult').value

    if(this.formHR.controls['newLpuName'].valid && this.formHR.controls['newHospCourseName'].valid && this.formHR.controls['newHospResult'].valid){
      const sForm = new FormGroup ({
        lpuName: new FormControl(name, {
          asyncValidators: [InList.validateLpuName(this.listService)],
          updateOn: 'blur'
        }),
        hospCourseName: new FormControl(hospCourseName, {
          asyncValidators: [InList.validateHospCourseName(this.listService)],
          updateOn: 'blur'
        }),
        hospResult: new FormControl(hospResultName, {
          asyncValidators: [InList.validateHospResult(this.listService)],
          updateOn: 'blur'
        }),
        dateHospIn: new FormControl(date),
        dateHospOut: new FormControl(dateHospOut)
      });
      const sData ={
        lpuName: name,
        hospCourseName: hospCourseName, 
        hospResult: hospResultName,
        dateHospIn: date,
        dateHospOut: dateHospOut
      }

      this.patientService.createHospResultRs(this.patientId, name, date, hospCourseName, dateHospOut, hospResultName)
      .subscribe()
  
      this.hospResultRs.push(sForm)
      this.pervValue.push(sData)
    }
    
    this.formHR.get('newLpuName').setValue('')
    this.formHR.get('newLpuName').markAsPristine()
    this.formHR.get('newDateHospIn').setValue('')
    this.formHR.get('newDateHospIn').markAsPristine()
    this.formHR.get('newHospCourseName').setValue('')
    this.formHR.get('newHospCourseName').markAsPristine()
    this.formHR.get('newDateHospOut').setValue('')
    this.formHR.get('newDateHospOut').markAsPristine()
    this.formHR.get('newHospResult').setValue('')
    this.formHR.get('newHospResult').markAsPristine()
  }

  updateHospResultRs(){
    let oldValue = this.pervValue;
    let curValue = this.formHR.controls['hospResultRs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          console.log(curValue[index]);
          
          this.patientService.updateHospResultRs
          (
            this.patientId,
            curValue[index].lpuName,
            curValue[index].dateHospIn,
            curValue[index].hospCourseName,
            curValue[index].dateHospOut,
            curValue[index].hospResult,
            oldValue[index].lpuName,
            oldValue[index].dateHospIn
          ).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }
}
