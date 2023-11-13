import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { PatientCardVisitService } from 'src/app/services/patient-card-visit.service';

@Component({
  selector: 'app-patient-registry',
  templateUrl: './patient-registry.component.html',
  styleUrls: ['./patient-registry.component.css']
})
export class PatientRegistryComponent implements OnInit{

  visibleTalon: boolean = false;
  date: Date;
  cab: string;

  formS: FormGroup;
  pervValue: any;
  @Input() subArr: FormArray; 
  @Input() patientId: number;
  @Output() isValid = new EventEmitter<boolean>();

  constructor(
    private patientService: PatientCardVisitService,
    private fb: FormBuilder,
    public modal: ModalService
  ){}

  ngOnInit() {
    this.isValid.emit(true);
    this.formS = this.fb.group({
      subs: this.subArr as FormArray
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

  update(){
    let oldValue = this.pervValue;
    let curValue = this.formS.controls['subs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          this.patientService.updateRegistry
          (
            this.patientId,
            curValue[index].regDate,
            curValue[index].regCab,
            curValue[index].regTime,
            curValue[index].regDoc,
            curValue[index].regCom,
            curValue[index].regCheck,
            oldValue[index].regDate,
            oldValue[index].regCab
          ).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }

  openTalon(index: number){
    let e = this.subs.at(index)
    this.cab = e.get('regCab').value
    this.date = e.get('regDate').value
    
    this.modal.open()
  }

  delReg(index: number){
    let e = this.subs.value.at(index)
    
    this.patientService.delRegistry(this.patientId, e.regDate, e.regCab).subscribe();
    this.pervValue.splice(index, 1);
    this.subs.removeAt(index);
  }
}