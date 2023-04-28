import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { PatientCardVisitService } from 'src/app/services/patient-card-visit.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-patient-check',
  templateUrl: './patient-check.component.html',
  styleUrls: ['./patient-check.component.css']
})
export class PatientCheckComponent implements OnInit{
  formS: FormGroup;
  pervValue: any;
  @Input() subArr: FormArray; 
  @Input() patientId: number;
  @Output() isValid = new EventEmitter<boolean>();

  constructor(
    private patientService: PatientCardVisitService,
    private fb: FormBuilder,
    private listService: ListService
  ){}

  ngOnInit() {
    this.isValid.emit(true);
    this.formS = this.fb.group({
      subs: this.subArr as FormArray,
      newCheckDateNext: new FormControl(),
      newCheckDate: new FormControl(),
      newCheckDoc: new FormControl('', {
        asyncValidators: [InList.validateDoctor(this.listService)],
        updateOn: 'blur'
      }),
      newCheckSpec: new FormControl('', {
        asyncValidators: [InList.validateSpec(this.listService)],
        updateOn: 'blur'
      })
    }, {updateOn: 'blur'});
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
    this.patientService.delChecks(this.patientId ,e.get('checkDate').value, e.get('checkSpec').value).subscribe();
    this.pervValue.splice(index, 1);
    this.subs.removeAt(index);
  }

  create() {
    let checkDateNext = this.formS.get('newCheckDateNext').value
    let checkDate = this.formS.get('newCheckDate').value
    let checkDoc = this.formS.get('newCheckDoc').value
    let checkSpec = this.formS.get('newCheckSpec').value

    if(this.formS.controls['newCheckDoc'].valid && this.formS.controls['newCheckSpec'].valid && this.formS.get('newCheckDate').value != null){
      
      this.patientService.createChecks(this.patientId, checkDate, checkSpec, checkDateNext, checkDoc).subscribe()
      
      const sForm = new FormGroup ({
        checkDateNext: new FormControl(checkDateNext),
            checkDate: new FormControl(checkDate, [Validators.required]),
            checkDoc: new FormControl(checkDoc, {
              validators: Validators.required,
              asyncValidators: [InList.validateDoctor(this.listService)],
              updateOn: 'blur'
            }),
            checkSpec: new FormControl(checkSpec, {
              validators: Validators.required,
              asyncValidators: [InList.validateSpec(this.listService)],
              updateOn: 'blur'
            })
      });
      const sData ={
        checkDateNext: checkDateNext,
            checkDate: checkDate,
            checkDoc: checkDoc,
            checkSpec: checkSpec
      }
      
      this.subs.push(sForm)
      this.isValid.emit(true);
      this.pervValue.push(sData)
    }
    this.formS.get('newCheckDateNext').setValue('')
    this.formS.get('newCheckDateNext').markAsPristine()
    this.formS.get('newCheckDate').setValue('')
    this.formS.get('newCheckDate').markAsPristine()
    this.formS.get('newCheckDoc').setValue('')
    this.formS.get('newCheckDoc').markAsPristine()
    this.formS.get('newCheckSpec').setValue('')
    this.formS.get('newCheckSpec').markAsPristine()
  }

  update(){
    let oldValue = this.pervValue;
    let curValue = this.formS.controls['subs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          this.patientService.updateChecks
          (
            this.patientId,
            curValue[index].checkDate,
            curValue[index].checkSpec,
            curValue[index].checkDateNext,
            curValue[index].checkDoc,
            oldValue[index].checkDate,
            oldValue[index].checkSpec,
            oldValue[index].checkDoc
          ).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }
}