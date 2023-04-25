import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { PatientCardEpidService } from 'src/app/services/patient-card-epid.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-patient-contact',
  templateUrl: './patient-contact.component.html',
  styleUrls: ['./patient-contact.component.css']
})
export class PatientContactComponent implements OnInit{
  formC: FormGroup;
  pervValue: any;
  @Input() contactArr: FormArray; 
  @Input() patientId: number;
  @Input() type: number;
  @Output() cIsValid = new EventEmitter<boolean>();

  constructor(
    private patientService: PatientCardEpidService,
    private fb: FormBuilder,
    private listService: ListService
  ){}

  ngOnInit() {
    this.cIsValid.emit(true);
    this.formC = this.fb.group({
      contacts: this.contactArr as FormArray,
      newContactId: new FormControl('', {
        asyncValidators: [InList.validatePatientCard(this.listService)],
        updateOn: 'blur'
      }),
      newFio: new FormControl({value: '', disabled: true}),
      newInfectCourseName: new FormControl('', {
        asyncValidators: [InList.validateInfectCourseLong(this.listService)],
        updateOn: 'blur'
      })
    }, {updateOn: 'blur'});
    this.pervValue = this.contactArr.value as FormArray;

    this.formC.controls['contacts'].statusChanges.subscribe(() => {
      if (this.formC.controls['contacts'].valid){
        this.updateContacts();
        this.cIsValid.emit(true);
      } else 
        this.cIsValid.emit(false);
    })
  }

  get contacts() {
    return this.formC.get('contacts') as FormArray;
  }

  delContacts(index: number) {
    let e = this.contacts.at(index);
    this.patientService.delContacts(this.patientId, e.get('contactId').value).subscribe();
    this.pervValue.splice(index, 1);
    this.contacts.removeAt(index);
  }

  async createContacts() {
    let contactId = this.formC.get('newContactId').value
    let infectCourseName = this.formC.get('newInfectCourseName').value
    let fio = await firstValueFrom(this.patientService.getFio(contactId))
    
    // this.patientService.getFio(contactId).subscribe(e => fio = e.fio)
    
    if(this.formC.controls['newInfectCourseName'].valid && this.formC.controls['newContactId'].valid){
      const sForm = new FormGroup ({
          contactId: new FormControl(contactId, {
            asyncValidators: [InList.validatePatientCard(this.listService)],
            updateOn: 'blur'
          }),
          Fio: new FormControl({value: fio.fio, disabled: true}),
          InfectCourseName: new FormControl(infectCourseName, {
            asyncValidators: [InList.validateInfectCourseLong(this.listService)],
            updateOn: 'blur'
          })
      });
      const sData ={
          contactId: contactId,
          Fio: fio.fio,
          InfectCourseName: infectCourseName,
      }
      
      this.patientService.createContacts(this.patientId, contactId, infectCourseName, this.type)
      .subscribe()

      this.contacts.push(sForm)
      this.cIsValid.emit(true);
      this.pervValue.push(sData)
    }
    this.formC.get('newContactId').setValue('')
    this.formC.get('newContactId').markAsPristine()
    this.formC.get('newInfectCourseName').setValue('')
    this.formC.get('newInfectCourseName').markAsPristine()
  }

  updateContacts(){
    let oldValue = this.pervValue;
    let curValue = this.formC.controls['contacts'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          
          this.patientService.updateContacts
          (
            this.patientId,
            curValue[index].contactId,
            curValue[index].InfectCourseName,
            this.type,
            oldValue[index].contactId
          ).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }
}
