import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { PatientCardDiagnosticManualService } from 'src/app/services/patient-card/patient-card-diagnostic-manual.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-diagnostic3-col-crud',
  templateUrl: './diagnostic3-col-crud.component.html',
  styleUrls: ['./diagnostic3-col-crud.component.css']
})
export class Diagnostic3ColCrudComponent implements OnInit{
  formS: FormGroup;
  pervValue: any;
  @Input() subArr: FormArray;
  @Input() type: string;
  @Input() patientId: number;
  @Output() isValid = new EventEmitter<boolean>();

  nameList:string

  constructor(
    private patientService: PatientCardDiagnosticManualService,
    private fb: FormBuilder,
    private listService: ListService
  ){}

  ngOnInit() {
    this.isValid.emit(true);
    this.nameList = 'listResult'+this.type;
    this.formS = this.fb.group({
      subs: this.subArr as FormArray,
      newDate: new FormControl(),
      newResult: new FormControl(),
      newResultDescr: new FormControl('', {
        updateOn: 'blur'
      })
    },{updateOn: 'blur'});
    switch (this.type) 
    {
      case 'vl':{
        this.formS.controls['newResultDescr'].addAsyncValidators(InList.validateVl(this.listService))
        break
      }
      case 'hc':{
        this.formS.controls['newResultDescr'].addAsyncValidators(InList.validateHc(this.listService))
        break
      }
      case 'hb':{
        this.formS.controls['newResultDescr'].addAsyncValidators(InList.validateHb(this.listService))
        break
      }
    }

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
    this.patientService.delManual(this.patientId, e.get('date').value, this.type).subscribe();
    this.pervValue.splice(index, 1);
    this.subs.removeAt(index);
  }

  create() {
    let date = this.formS.get('newDate').value
    let result = this.formS.get('newResult').value
    let resultDescr = this.formS.get('newResultDescr').value
    
    if(this.formS.controls['newResult'].valid && 
    this.formS.controls['newResultDescr'].valid && 
    this.formS.controls['newDate'].value.length != 0){
      
      this.patientService.createManual(this.patientId, date, this.type, result, resultDescr).subscribe()
      
      const sForm = new FormGroup ({
        date: new FormControl(date, Validators.required),
        result: new FormControl(result),
        resultDescr: new FormControl(resultDescr, {
          updateOn: 'blur'
        })
      });

      switch (this.type) 
      {
        case 'vl':{
          sForm.controls['resultDescr'].addAsyncValidators(InList.validateVl(this.listService))
          break
        }
        case 'hc':{
          sForm.controls['resultDescr'].addAsyncValidators(InList.validateHc(this.listService))
          break
        }
        case 'hb':{
          sForm.controls['resultDescr'].addAsyncValidators(InList.validateHb(this.listService))
          break
        }
      }


      const sData ={
        date: date,
        result: result,
        resultDescr: resultDescr
      }
      
      this.subs.push(sForm)
      this.isValid.emit(true);
      this.pervValue.push(sData)
    }
    this.formS.get('newDate').setValue('')
    this.formS.get('newDate').markAsPristine()
    this.formS.get('newResult').setValue('')
    this.formS.get('newResult').markAsPristine()
    this.formS.get('newResultDescr').setValue('')
    this.formS.get('newResultDescr').markAsPristine()
  }

  update(){
    let oldValue = this.pervValue;
    let curValue = this.formS.controls['subs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          this.patientService.updateManual
          (
            this.patientId,
            curValue[index].date,
            this.type,
            curValue[index].result,
            curValue[index].resultDescr,
            oldValue[index].date
          ).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }
}
