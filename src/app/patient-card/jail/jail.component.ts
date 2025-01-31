import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { PatientCardJailService } from 'src/app/services/patient-card/patient-card-jail.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-jail',
  templateUrl: './jail.component.html',
  styleUrls: ['./jail.component.css']
})
export class JailComponent implements OnInit{
  formS: FormGroup;
  pervValue: any;
  @Input() subArr: FormArray; 
  @Input() patientId: number;
  @Output() isValid = new EventEmitter<boolean>();

  constructor(
    private patientService: PatientCardJailService,
    private fb: FormBuilder,
    private listService: ListService
  ){}

  ngOnInit() {
    this.isValid.emit(true);
    this.formS = this.fb.group({
      subs: this.subArr as FormArray,
      newJailStart: new FormControl(),
      newJailEnd: new FormControl(),
      newJailName: new FormControl('', {
        asyncValidators: [InList.validateJail(this.listService)],
        updateOn: 'blur'
      }),
      newJailLeavName: new FormControl('', {
        asyncValidators: [InList.validateJail(this.listService)],
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
    this.patientService.delJail(this.patientId, e.get('jailStart').value, e.get('jailEnd').value).subscribe();
    this.pervValue.splice(index, 1);
    this.subs.removeAt(index);
  }

  create() {
    console.log(this.formS.controls['newJailStart']);
    console.log(this.formS.controls['newJailStart'].value, this.formS.controls['newJailStart'].value != null);
    
    if(this.formS.controls['newJailName'].valid && this.formS.controls['newJailLeavName'].valid 
    && (this.formS.controls['newJailStart'].value != null || this.formS.controls['newJailStart'].value.length !=0)
    && (this.formS.controls['newJailEnd'].value != null || this.formS.controls['newJailEnd'].value.length !=0)){
      
      let jailStart = this.formS.controls['newJailStart'].value
      let jailEnd = this.formS.controls['newJailEnd'].value
      let jailName = this.formS.controls['newJailName'].value
      let jailLeavName = this.formS.controls['newJailLeavName'].value
      
      this.patientService.createJail(this.patientId, jailName, jailLeavName, jailStart, jailEnd).subscribe()
      
      const sForm = new FormGroup ({
        jailStart: new FormControl(jailStart, Validators.required),
        jailEnd: new FormControl(jailEnd, Validators.required),
        jailName: new FormControl(jailName, {
          asyncValidators: [InList.validateJail(this.listService)],
          updateOn: 'blur'
        }),
        jailLeavName: new FormControl(jailLeavName, {
          asyncValidators: [InList.validateJail(this.listService)],
          updateOn: 'blur'
        })
      });

      const sData ={
        jailStart: jailStart,
        jailEnd: jailEnd,
        jailName: jailName,
        jailLeavName: jailLeavName
      }
      
      this.subs.push(sForm)
      this.isValid.emit(true);
      this.pervValue.push(sData)
    }
    this.formS.get('newJailStart').setValue('')
    this.formS.get('newJailStart').markAsPristine()
    this.formS.get('newJailEnd').setValue('')
    this.formS.get('newJailEnd').markAsPristine()
    this.formS.get('newJailName').setValue('')
    this.formS.get('newJailName').markAsPristine()
    this.formS.get('newJailLeavName').setValue('')
    this.formS.get('newJailLeavName').markAsPristine()
  }

  update(){
    let oldValue = this.pervValue;
    let curValue = this.formS.controls['subs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){

          this.patientService.updateJail(
            this.patientId, 
            curValue[index].jailName, 
            curValue[index].jailLeavName, 
            curValue[index].jailStart, 
            curValue[index].jailEnd, 
            oldValue[index].jailStart, 
            oldValue[index].jailEnd
            ).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }
}
