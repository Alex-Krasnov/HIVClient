import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { PatientCardEpidService } from 'src/app/services/patient-card-epid.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-patient-pav-not-inj',
  templateUrl: './patient-pav-not-inj.component.html',
  styleUrls: ['./patient-pav-not-inj.component.css']
})
export class PatientPavNotInjComponent implements OnInit{
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
      subs: this.subArr as FormArray,
      newDrugId: new FormControl(),
      newDateStart: new FormControl(),
      newDateEnd: new FormControl(),
      newDrugName: new FormControl(),
      newYnName: new FormControl('', {
        asyncValidators: [InList.validateYn(this.listService)],
        updateOn: 'blur'
      })
    }, {updateOn: 'blur'});
    this.pervValue = this.subArr.value as FormArray;
    
    this.formS.controls['subs'].statusChanges.subscribe(() => {
      if (this.formS.controls['subs'].valid){
        this.updatePavNotInj();
        this.isValid.emit(true);
      } else 
        this.isValid.emit(false);
    })
  }

  get subs() {
     return this.formS.get('subs') as FormArray;
  }

  delPavNotInj(index: number) {
    let e = this.subs.at(index);
    this.patientService.delPavNotInj(e.get('drugId').value).subscribe();
    this.pervValue.splice(index, 1);
    this.subs.removeAt(index);
  }

  async createPavNotInj() {
    let drugName = this.formS.get('newDrugName').value
    let ynName = this.formS.get('newYnName').value
    let dateStart = this.formS.get('newDateStart').value
    let dateEnd = this.formS.get('newDateEnd').value
    
    if(this.formS.controls['newDrugName'].valid && this.formS.controls['newYnName'].valid){
      
      let drugId  =  await firstValueFrom(this.patientService.createPavNotInj(this.patientId, ynName, drugName, dateStart, dateEnd))
      
      const sForm = new FormGroup ({
        drugId: new FormControl(drugId),
        dateStart: new FormControl(dateStart),
        dateEnd: new FormControl(dateEnd),
        drugName: new FormControl(drugName),
        ynName: new FormControl(ynName, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        })
      });
      const sData ={
        drugId: drugId,
        dateStart: dateStart,
        dateEnd: dateEnd,
        drugName: drugName,
        ynName: ynName
      }
      
      this.subs.push(sForm)
      this.isValid.emit(true);
      this.pervValue.push(sData)
    }
    this.formS.get('newDrugName').setValue('')
    this.formS.get('newDrugName').markAsPristine()
    this.formS.get('newYnName').setValue('')
    this.formS.get('newYnName').markAsPristine()
    this.formS.get('newDateStart').setValue('')
    this.formS.get('newDateStart').markAsPristine()
    this.formS.get('newDateEnd').setValue('')
    this.formS.get('newDateEnd').markAsPristine()
  }

  updatePavNotInj(){
    let oldValue = this.pervValue;
    let curValue = this.formS.controls['subs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          this.patientService.updatePavNotInj
          (
            curValue[index].ynName,
            curValue[index].drugName,
            curValue[index].dateStart,
            curValue[index].dateEnd,
            curValue[index].drugId
          ).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }
}
