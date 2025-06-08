import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { PatientCardIhlaService } from 'src/app/services/patient-card/patient-card-ihla.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-analysis-ihla',
  templateUrl: './analysis-ihla.component.html',
  styleUrls: ['./analysis-ihla.component.css']
})
export class AnalysisIhlaComponent implements OnInit{
  formS: FormGroup;
  pervValue: any;
  @Input() subArr: FormArray;
  @Input() patientId: number;
  @Output() isValid = new EventEmitter<boolean>();

  constructor(
    private patientService: PatientCardIhlaService,
    private fb: FormBuilder
  ){}

  ngOnInit() {
    this.isValid.emit(true);
    
    this.formS = this.fb.group({
      subs: this.subArr as FormArray,
      newDate: new FormControl(),
      newResult: new FormControl()
    },{updateOn: 'blur'});
    
    this.pervValue = this.subArr.value as FormArray;

    this.formS.controls['subs'].statusChanges.subscribe(() => {
      if (this.formS.controls['subs'].valid){
        this.update();
        this.isValid.emit(true);
      } else 
        this.isValid.emit(false);
    })
  }

  get subs() {
     return this.formS.get('subs') as FormArray;
  }

  del(index: number) {
    let e = this.subs.at(index);
    this.patientService.del(e.get('id').value).subscribe();
    this.pervValue.splice(index, 1);
    this.subs.removeAt(index);
  }

  async create() {
    let date = this.formS.get('newDate').value
    let result = this.formS.get('newResult').value
    
    if(this.formS.controls['newResult'].valid && this.formS.controls['newDate'].value.length != 0)
    {
      let item = await firstValueFrom(this.patientService.create(this.patientId, date, result))
      
      const sForm = new FormGroup({
        id: new FormControl(item.id),
        patientId: new FormControl(item.patientId),
        result: new FormControl(item.result),
        analysisDate: new FormControl(item.analysisDate),
      });

      const sData = {
        id: item.id,
        patientId: item.patientId,
        result: item.result,
        analysisDate: item.analysisDate,
      }
      
      this.subs.push(sForm)
      this.isValid.emit(true);
      this.pervValue.push(sData)
    }
    this.formS.get('newDate').setValue('')
    this.formS.get('newDate').markAsPristine()
    this.formS.get('newResult').setValue('')
    this.formS.get('newResult').markAsPristine()
  }

  update(){
    let oldValue = this.pervValue;
    let curValue = this.formS.controls['subs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          this.patientService.update
          (
            curValue[index].id,
            this.patientId,
            curValue[index].analysisDate,
            curValue[index].result
          ).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }
}
