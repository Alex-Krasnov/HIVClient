import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { PatientCardMainService } from 'src/app/services/patient-card-main.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-patient-blot',
  templateUrl: './patient-blot.component.html',
  styleUrls: ['./patient-blot.component.css']
})
export class PatientBlotComponent implements OnInit {

  formB: FormGroup;
  pervValue: any;
  @Input() blotArr: FormArray; 
  @Input() patientId: number;
  // @Output() bForUpd = new EventEmitter<object[]>();
  @Output() bIsValid = new EventEmitter<boolean>();

  constructor(
    private patientService: PatientCardMainService,
    private fb: FormBuilder,
    private listService: ListService
  ){}

  ngOnInit() {
    this.bIsValid.emit(true);
    this.formB = this.fb.group({
      blots: this.blotArr as FormArray,
      newBlotId: new FormControl('', Validators.pattern("^[0-9]*$")),
      newBlotNo: new FormControl('',Validators.pattern("^[0-9]*$")),
      newBlotDate: new FormControl(),
      newBlotRes: new FormControl('', {
        asyncValidators: [InList.validateIbResult(this.listService)],
        updateOn: 'blur'
      }),
      newCheckPlace: new FormControl('', {
        asyncValidators: [InList.validateCheckPlace(this.listService)],
        updateOn: 'blur'
      }),
      newFirst: new FormControl(),
      newLast: new FormControl(),
      newIfa: new FormControl()
    }, {updateOn: 'blur'});
    this.pervValue = this.blotArr.value as FormArray;

    this.formB.controls['blots'].statusChanges.subscribe(() => {
      if (this.formB.controls['blots'].valid){
        this.updateBlot();
        this.bIsValid.emit(true);
      } else 
        this.bIsValid.emit(false);
    })
 }

 get blots(){
    return this.formB.get('blots') as FormArray;
 }

 delBlot(index: number) {
    let e = this.blots.at(index)
    this.patientService.delPatientBlot(this.patientId, e.get('blotId').value).subscribe();
    this.pervValue.splice(index, 1);
    this.blots.removeAt(index);
  }

  createBlot(){
    let BlotId = this.formB.get('newBlotId').value
    let BlotNo = this.formB.get('newBlotNo').value
    let BlotDate = this.formB.get('newBlotDate').value
    let ibResult = this.formB.get('newBlotRes').value
    let CheckPlace = this.formB.get('newCheckPlace').value
    let First = this.formB.get('newFirst').value
    let Last = this.formB.get('newLast').value
    let FlgIfa = this.formB.get('newIfa').value

    if(
      this.formB.controls['newBlotId'].valid && 
      this.formB.controls['newBlotNo'].valid && 
      this.formB.controls['newBlotRes'].valid && 
      this.formB.controls['newCheckPlace'].valid
      ){
      const blotForm = new FormGroup ({
        blotId: new FormControl(BlotId, Validators.pattern("^[0-9]*$")),
        blotNo: new FormControl(BlotNo, Validators.pattern("^[0-9]*$")),
        blotDate: new FormControl(BlotDate),
        blotRes: new FormControl(ibResult, {
          asyncValidators: [InList.validateIbResult(this.listService)],
          updateOn: 'blur'
        }),
        checkPlace: new FormControl(CheckPlace, {
          asyncValidators: [InList.validateCheckPlace(this.listService)],
          updateOn: 'blur'
        }),
        first: new FormControl(First),
        last: new FormControl(Last),
        ifa: new FormControl(FlgIfa),
        inputDate: new FormControl({value: Date.now(), disabled: true})
      });
  
      const blotData = {
        blotId: BlotId,
        blotNo: BlotNo,
        blotDate: BlotDate,
        blotRes: ibResult,
        checkPlace: CheckPlace,
        first: First,
        last: Last,
        ifa: FlgIfa,
        inputDate: Date.now()
      }
  
      this.patientService.createPatientBlot(this.patientId, BlotId, BlotNo, BlotDate, ibResult, CheckPlace, First, Last, FlgIfa)
      .subscribe()
  
      this.blots.push(blotForm)
      this.pervValue.push(blotData);
      this.bIsValid.emit(true);
    }

    this.formB.get('newBlotId').setValue('')
    this.formB.get('newBlotNo').setValue('')
    this.formB.get('newBlotDate').setValue('')
    this.formB.get('newBlotRes').setValue('')
    this.formB.get('newCheckPlace').setValue('')
    this.formB.get('newFirst').setValue('')
    this.formB.get('newLast').setValue('')
    this.formB.get('newIfa').setValue('')
    this.formB.get('newBlotId').markAsPristine()
    this.formB.get('newBlotNo').markAsPristine()
    this.formB.get('newBlotDate').markAsPristine()
    this.formB.get('newBlotRes').markAsPristine()
    this.formB.get('newCheckPlace').markAsPristine()
    this.formB.get('newFirst').markAsPristine()
    this.formB.get('newLast').markAsPristine()
    this.formB.get('newIfa').markAsPristine()
  }

  updateBlot(){
    let oldValue = this.pervValue;
    let curValue = this.formB.controls['blots'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue))){
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          // console.log(curValue[index]);
          this.patientService.updatePatientBlot
          (
            this.patientId, 
            curValue[index].blotId, 
            oldValue[index].blotId, 
            curValue[index].blotNo == "" ? null : curValue[index].blotNo, 
            curValue[index].blotDate, 
            curValue[index].blotRes, 
            curValue[index].checkPlace, 
            curValue[index].first,
            curValue[index].last,
            curValue[index].ifa
          ).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
    }
  }

  ngOnDestroy() {}
}
