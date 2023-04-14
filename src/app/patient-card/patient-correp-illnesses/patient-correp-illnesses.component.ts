import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { PatientCardTreatmentService } from 'src/app/services/patient-card-treatment.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-patient-correp-illnesses',
  templateUrl: './patient-correp-illnesses.component.html',
  styleUrls: ['./patient-correp-illnesses.component.css']
})
export class PatientCorrepIllnessesComponent implements OnInit{
  formCI: FormGroup;
  pervValue: any;
  @Input() correpIllnessesArr: FormArray; 
  @Input() patientId: number;
  @Output() ciIsValid = new EventEmitter<boolean>();

  constructor(
    private patientService: PatientCardTreatmentService,
    private fb: FormBuilder,
    private listService: ListService
  ){}

  ngOnInit() {
    this.ciIsValid.emit(true);
    this.formCI = this.fb.group({
      correpIllnesses: this.correpIllnessesArr as FormArray,
      newCorrespIllness: new FormControl('',{
        asyncValidators: [InList.validateCorrespIllnesses(this.listService)],
        updateOn: 'blur'
      })
    }, {updateOn: 'blur'});
    this.pervValue = this.correpIllnessesArr.value as FormArray;
    console.log(this.pervValue);
    

    this.formCI.controls['correpIllnesses'].statusChanges.subscribe(() => {
      if (this.formCI.controls['correpIllnesses'].valid){
        this.updateCorrepIllnesses();
        this.ciIsValid.emit(true);
      } else 
        this.ciIsValid.emit(false);
    })
  }

  get correpIllnesses() {
    return this.formCI.get('correpIllnesses') as FormArray;
  }

  delCorrepIllnesses(index: number) {
    let e = this.correpIllnesses.at(index);
    this.patientService.delCorrepIllness(this.patientId, e.get('correspIllness').value).subscribe();
    this.pervValue.splice(index, 1);
    this.correpIllnesses.removeAt(index);
  }

  createCorrepIllnesses() {
    let name = this.formCI.get('newCorrespIllness').value

    if(this.formCI.controls['newCorrespIllness'].valid){
      const sForm = new FormGroup ({
        correspIllness: new FormControl(name),
        correspIllnessDate: new FormControl({value: Date.now(), disabled: true})
      });
      const sData ={
        correspIllness: name,
        correspIllnessDate: Date.now()
      }
  
      this.patientService.createCorrepIllness(this.patientId, name)
      .subscribe()
  
      this.correpIllnesses.push(sForm)
      this.pervValue.push(sData)
    }
    
    this.formCI.get('newCorrespIllness').setValue('')
    this.formCI.get('newCorrespIllness').markAsPristine()
  }

  updateCorrepIllnesses(){
    let oldValue = this.pervValue;
    let curValue = this.formCI.controls['correpIllnesses'].value;

    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          
          this.patientService.updateCorrepIllness
          (
            this.patientId, 
            curValue[index].correspIllness, 
            oldValue[index].correspIllness
          ).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }
}
