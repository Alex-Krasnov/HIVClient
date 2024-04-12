import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { PatientCardEpidService } from 'src/app/services/patient-card-epid.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-patient-epid-child',
  templateUrl: './patient-epid-child.component.html',
  styleUrls: ['./patient-epid-child.component.css']
})
export class PatientEpidChildComponent implements OnInit{
  formC: FormGroup;
  pervValue: any;
  @Input() childArr: FormArray; 
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
      child: this.childArr as FormArray,
      newBirthDate: new FormControl(null),
      newFamilyName: new FormControl(null, {updateOn: 'blur'}),
      newFirstName: new FormControl(null, {updateOn: 'blur'}),
      newThirdName: new FormControl(null, {updateOn: 'blur'}),
      newExam: new FormControl(false),
      newSexName: new FormControl(null, {
        asyncValidators: [InList.validateSex(this.listService)],
        updateOn: 'blur'
      })
    }, {updateOn: 'blur'});
    this.pervValue = this.childArr.value as FormArray;

    this.formC.controls['child'].statusChanges.subscribe(() => {
      if (this.formC.controls['child'].valid){
        this.update();
        this.isValid.emit(true);
      } else 
        this.isValid.emit(false);
    })
  }

  get child() {
    return this.formC.get('child') as FormArray;
  }

  del(index: number) {
    let e = this.child.at(index);
    this.patientService.delEpidChild(e.get('id').value).subscribe();
    this.pervValue.splice(index, 1);
    this.child.removeAt(index);
  }

  async create() {
    let birthDate = this.formC.get('newBirthDate').value
    let familyName = this.formC.get('newFamilyName').value
    let firstName = this.formC.get('newFirstName').value
    let thirdName = this.formC.get('newThirdName').value
    let exam = this.formC.get('newExam').value
    let sexName = this.formC.get('newSexName').value
            
    if(this.formC.controls['newSexName'].valid){
      const sForm = new FormGroup ({
        id: new FormControl(this.maxId+1),
        birthDate: new FormControl(birthDate),
        familyName: new FormControl(familyName, {updateOn: 'blur'}),
        firstName: new FormControl(firstName, {updateOn: 'blur'}),
        thirdName: new FormControl(thirdName, {updateOn: 'blur'}),
        exam: new FormControl(exam),
        sexName: new FormControl(sexName, {
          asyncValidators: [InList.validateSex(this.listService)],
          updateOn: 'blur'
        })
      });
      const sData ={
        id: this.maxId+1,
        birthDate: birthDate,
        familyName: familyName,
        firstName: firstName,
        thirdName: thirdName,
        exam: exam,
        sexName: sexName
      }
      
      this.patientService.createEpidChild(this.maxId+1, this.patientId, sexName, familyName, firstName, thirdName, birthDate, exam)
      .subscribe()
      this.maxId += this.maxId
      this.child.push(sForm)
      this.isValid.emit(true)
      this.pervValue.push(sData)
    }

    this.formC.get('newBirthDate').setValue('')
    this.formC.get('newBirthDate').markAsPristine()

    this.formC.get('newFamilyName').setValue('')
    this.formC.get('newFamilyName').markAsPristine()

    this.formC.get('newFirstName').setValue('')
    this.formC.get('newFirstName').markAsPristine()
    
    this.formC.get('newThirdName').setValue('')
    this.formC.get('newThirdName').markAsPristine()
    
    this.formC.get('newExam').setValue('')
    this.formC.get('newExam').markAsPristine()
    
    this.formC.get('newSexName').setValue('')
    this.formC.get('newSexName').markAsPristine()
  }

  update(){
    let oldValue = this.pervValue;
    let curValue = this.formC.controls['child'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          this.patientService.updateEpidChild
          (
            curValue[index].id,
            this.patientId,
            curValue[index].sexName,
            curValue[index].familyName,
            curValue[index].firstName,
            curValue[index].thirdName,
            curValue[index].birthDate,
            curValue[index].exam
          ).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }
}