import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PatientCardMainService } from 'src/app/services/patient-card-main.service';

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
  @Output() bForUpd = new EventEmitter<object[]>();

  constructor(
    private patientService: PatientCardMainService,
    private fb: FormBuilder
  ){}

  ngOnInit() {
    this.formB = this.fb.group({
      blots: this.blotArr as FormArray,
      newBlotId: new FormControl(),
      newBlotNo: new FormControl(),
      newBlotDate: new FormControl(),
      newBlotRes: new FormControl(),
      newCheckPlace: new FormControl(),
      newFirst: new FormControl(),
      newLast: new FormControl(),
      newIfa: new FormControl()
    });
    this.pervValue = this.blotArr.value as FormArray;
 }

 get blots(){
    return this.formB.get('blots') as FormArray;
 }

 delBlot(index: number) {
    let e = this.blots.at(index)
    this.patientService.delPatientBlot(this.patientId, e.get('blotId').value).subscribe(); 
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

    const blotForm = new FormGroup ({
      blotId: new FormControl(BlotId),
      blotNo: new FormControl(BlotNo),
      blotDate: new FormControl(BlotDate),
      blotRes: new FormControl(ibResult),
      checkPlace: new FormControl(CheckPlace),
      first: new FormControl(First),
      last: new FormControl(Last),
      ifa: new FormControl(FlgIfa),
      inputDate: new FormControl(Date.now())
    });

    this.patientService.createPatientBlot(this.patientId, BlotId, BlotNo, BlotDate, ibResult, CheckPlace, First, Last, FlgIfa)
    .subscribe()

    this.blots.push(blotForm)

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

  ngOnDestroy() {
    let oldValue = this.pervValue;
    let curValue = this.formB.controls['blots'].value;

    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue))){
      var forUpd = [];

      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          forUpd.push({
            patientId: this.patientId, 
            blotId: curValue[index].blotId,
            blotNo: curValue[index].blotNo,
            blotDate: curValue[index].blotDate,
            ibResultId: curValue[index].blotRes,
            checkPlaceId: curValue[index].checkPlace,
            first: curValue[index].first,
            last: curValue[index].last,
            flgIfa: curValue[index].ifa,
            blotIdOld: oldValue[index].blotId
          });
        }
      } 
      this.bForUpd.emit(forUpd);
    }
  }
}
