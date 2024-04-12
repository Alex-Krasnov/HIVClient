import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { PatientCardEpidService } from 'src/app/services/patient-card-epid.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-patient-call',
  templateUrl: './patient-call.component.html',
  styleUrls: ['./patient-call.component.css']
})
export class PatientCallComponent implements OnInit{
  formC: FormGroup;
  pervValue: any;
  @Input() callArr: FormArray; 
  @Input() patientId: number;
  @Input() maxId: number;
  @Output() isValid = new EventEmitter<boolean>();

  constructor(
    private patientService: PatientCardEpidService,
    private fb: FormBuilder,
    private listService: ListService
  ){}

  ngOnInit() {
    this.isValid.emit(true);
    this.formC = this.fb.group({
      call: this.callArr as FormArray,
      newCallDate: new FormControl(null),
      newCallStatus: new FormControl(null, {
        asyncValidators: [InList.validateCallStatuses(this.listService)],
        updateOn: 'blur'
      })
    }, {updateOn: 'blur'});
    this.pervValue = this.callArr.value as FormArray;

    this.formC.controls['call'].statusChanges.subscribe(() => {
      if (this.formC.controls['call'].valid){
        this.update();
        this.isValid.emit(true);
      } else 
        this.isValid.emit(false);
    })
  }

  get call() {
    return this.formC.get('call') as FormArray;
  }

  del(index: number) {
    let e = this.call.at(index);
    this.patientService.delCall(e.get('id').value).subscribe();
    this.pervValue.splice(index, 1);
    this.call.removeAt(index);
  }

  async create() {
    let callDate = this.formC.get('newCallDate').value
    let callStatus = this.formC.get('newCallStatus').value
            
    if(this.formC.controls['newCallStatus'].valid){
      const sForm = new FormGroup ({
        id: new FormControl(this.maxId+1),
        callDate: new FormControl(callDate),
        callStatus: new FormControl(callStatus, {
          asyncValidators: [InList.validateCallStatuses(this.listService)],
          updateOn: 'blur'
        })
      });
      const sData ={
        id: this.maxId+1,
        callDate: callDate,
        callStatus: callStatus
      }
      
      this.patientService.createCall(this.maxId+1, this.patientId, callStatus, callDate)
      .subscribe()
      this.maxId += this.maxId
      this.call.push(sForm)
      this.isValid.emit(true)
      this.pervValue.push(sData)
    }

    this.formC.get('newCallDate').setValue('')
    this.formC.get('newCallDate').markAsPristine()

    this.formC.get('newCallStatus').setValue('')
    this.formC.get('newCallStatus').markAsPristine()
  }

  update(){
    let oldValue = this.pervValue;
    let curValue = this.formC.controls['call'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          this.patientService.updateCall
          (
            curValue[index].id,
            this.patientId,
            curValue[index].callStatus,
            curValue[index].callDate
          ).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }
}