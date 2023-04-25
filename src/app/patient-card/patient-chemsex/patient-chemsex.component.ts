import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { PatientCardEpidService } from 'src/app/services/patient-card-epid.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-patient-chemsex',
  templateUrl: './patient-chemsex.component.html',
  styleUrls: ['./patient-chemsex.component.css']
})
export class PatientChemsexComponent implements OnInit{
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
      newDrugName: new FormControl(),
      newContactTypeName: new FormControl('', {
        asyncValidators: [InList.validateInfectCourseLong(this.listService)],
        updateOn: 'blur'
      }),
      newYnName: new FormControl('', {
        asyncValidators: [InList.validateYn(this.listService)],
        updateOn: 'blur'
      })
    }, {updateOn: 'blur'});
    this.pervValue = this.subArr.value as FormArray;

    this.formS.controls['subs'].statusChanges.subscribe(() => {
      if (this.formS.controls['subs'].valid){
        this.updateContacts();
        this.isValid.emit(true);
      } else 
        this.isValid.emit(false);
    })
  }

  get subs() {
    return this.formS.get('subs') as FormArray;
  }

  delChemsex(index: number) {
    let e = this.subs.at(index);
    this.patientService.delChemsex(e.get('drugId').value).subscribe();
    this.pervValue.splice(index, 1);
    this.subs.removeAt(index);
  }

  async createChemsex() {
    let drugName = this.formS.get('newDrugName').value
    let contactTypeName = this.formS.get('newContactTypeName').value
    let ynName = this.formS.get('newYnName').value
    
    if(this.formS.controls['newDrugName'].valid && this.formS.controls['newContactTypeName'].valid && this.formS.controls['newYnName'].valid){
      // this.patientService.createChemsex(this.patientId, ynName, drugName, contactTypeName).subscribe(
      //   item => console.log('fsgdfhgfj', item))
      
      let drugId  =  await firstValueFrom(this.patientService.createChemsex(this.patientId, ynName, drugName, contactTypeName))
      console.log(drugId);
      

      const sForm = new FormGroup ({
        drugId: new FormControl(drugId),
        drugName: new FormControl(drugName),
        contactTypeName: new FormControl(contactTypeName, {
          asyncValidators: [InList.validateInfectCourseLong(this.listService)],
          updateOn: 'blur'
        }),
        ynName: new FormControl(ynName, {
          asyncValidators: [InList.validateYn(this.listService)],
          updateOn: 'blur'
        })
      });
      const sData ={
        drugId: drugId,
        drugName: drugName,
        contactTypeName: contactTypeName,
        ynName: ynName
      }
      
      this.subs.push(sForm)
      this.isValid.emit(true);
      this.pervValue.push(sData)
    }
    this.formS.get('newDrugName').setValue('')
    this.formS.get('newDrugName').markAsPristine()
    this.formS.get('newContactTypeName').setValue('')
    this.formS.get('newContactTypeName').markAsPristine()
    this.formS.get('newYnName').setValue('')
    this.formS.get('newYnName').markAsPristine()
  }

  updateContacts(){
    let oldValue = this.pervValue;
    let curValue = this.formS.controls['subs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          this.patientService.updateChemsex
          (
            curValue[index].ynName,
            curValue[index].drugName,
            curValue[index].contactTypeName,
            curValue[index].drugId
          ).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }
}
