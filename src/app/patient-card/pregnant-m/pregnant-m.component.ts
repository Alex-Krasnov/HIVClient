import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { pcPregM } from 'src/app/_interfaces/pc-preg-m.model';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';
import { PatientCardPregnantService } from 'src/app/services/patient-card/patient-card-pregnant.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-pregnant-m',
  templateUrl: './pregnant-m.component.html',
  styleUrls: ['./pregnant-m.component.css']
})
export class PregnantMComponent implements OnInit, OnChanges{
  formS: FormGroup;
  pervValue: any;
  indForUpd: number;
  fielForUpd: number;
  @Input() subArr: FormArray; 
  @Input() patientId: number;
  @Input() updSchema: string;
  @Output() isValid = new EventEmitter<boolean>();

  constructor(
    private patientService: PatientCardPregnantService,
    private fb: FormBuilder,
    public modal: ModalService,
    private listService: ListService
  ){}

  ngOnInit() {
    this.isValid.emit(true);
    this.formS = this.fb.group({
      subs: this.subArr as FormArray,
      newPregId: new FormControl(),
      newPwCheck: new FormControl(),
      newPwMonth: new FormControl(),
      newPregDate: new FormControl(),
      newChildBirthDate: new FormControl(),
      newBirthType: new FormControl(null, {
        asyncValidators: [InList.validateBirthType(this.listService)],
        updateOn: 'blur'
      }),
      newChildCount: new FormControl(null, {
        asyncValidators: [InList.validateChildCount(this.listService)],
        updateOn: 'blur'
      }),
      newChildId: new FormControl(null, {
        asyncValidators: [InList.validatePatientCard(this.listService)],
        updateOn: 'blur'
      }),
      newStartMonth: new FormControl(),
      newChildFamilyName: new FormControl(),
      newChildFirstName: new FormControl(),
      newChildThirdName: new FormControl(),
      newPregDescr: new FormControl(),
      newPhpSchema1: new FormControl('', {
        asyncValidators: [InList.validateCureSchemaName(this.listService)],
        updateOn: 'blur'
      }),
      newPhpSchema2: new FormControl('', {
        asyncValidators: [InList.validateCureSchemaName(this.listService)],
        updateOn: 'blur'
      }),
      newPhpSchema3: new FormControl('', {
        asyncValidators: [InList.validateCureSchemaName(this.listService)],
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
    this.patientService.delPregM(this.patientId,e.get('pregId').value).subscribe();
    this.pervValue.splice(index, 1);
    this.subs.removeAt(index);
  }

  create() {
    if(this.formS.controls['newBirthType'].valid && this.formS.controls['newChildCount'].valid 
    && this.formS.controls['newPhpSchema1'].valid && this.formS.controls['newPhpSchema2'].valid 
    && this.formS.controls['newPhpSchema3'].valid && this.formS.controls['newChildId'].valid &&
    this.formS.controls['newPregId'].value.length != 0){
      let item: pcPregM = {
        patientId: this.patientId,
        pregId: this.formS.controls['newPregId'].value,
        pwCheck: this.formS.controls['newPwCheck'].value,
        pwMonth: this.formS.controls['newPwMonth'].value,
        pregDate: this.formS.controls['newPregDate'].value,
        childBirthDate: this.formS.controls['newChildBirthDate'].value,
        birthType: this.formS.controls['newBirthType'].value,
        childCount: this.formS.controls['newChildCount'].value,
        childId: this.formS.controls['newChildId'].value,
        startMonth: this.formS.controls['newStartMonth'].value,
        childFamilyName: this.formS.controls['newChildFamilyName'].value,
        childFirstName: this.formS.controls['newChildFirstName'].value,
        childThirdName: this.formS.controls['newChildThirdName'].value,
        pregDescr: this.formS.controls['newPregDescr'].value,
        phpSchema1: this.formS.controls['newPhpSchema1'].value,
        phpSchema2: this.formS.controls['newPhpSchema2'].value,
        phpSchema3: this.formS.controls['newPhpSchema3'].value
      };
      console.log(item);
      

      this.patientService.createPregM(item).subscribe()

      const sForm = new FormGroup ({
        pregId: new FormControl(item.pregId, Validators.required),
        pwCheck: new FormControl(item.pwCheck),
        pwMonth: new FormControl(item.pwMonth),
        pregDate: new FormControl(item.pregDate),
        childBirthDate: new FormControl(item.childBirthDate),
        birthType: new FormControl(item.birthType, {
          asyncValidators: [InList.validateBirthType(this.listService)],
          updateOn: 'blur'
        }),
        childCount: new FormControl(item.childCount, {
          asyncValidators: [InList.validateChildCount(this.listService)],
          updateOn: 'blur'
        }),
        childId: new FormControl(item.childId),
        startMonth: new FormControl(item.startMonth),
        childFamilyName: new FormControl(item.childFamilyName),
        childFirstName: new FormControl(item.childFirstName),
        childThirdName: new FormControl(item.childThirdName),
        pregDescr: new FormControl(item.pregDescr),
        phpSchema1: new FormControl(item.phpSchema1, {
          asyncValidators: [InList.validateCureSchemaName(this.listService)],
          updateOn: 'blur'
        }),
        phpSchema2: new FormControl(item.phpSchema2, {
          asyncValidators: [InList.validateCureSchemaName(this.listService)],
          updateOn: 'blur'
        }),
        phpSchema3: new FormControl(item.phpSchema3, {
          asyncValidators: [InList.validateCureSchemaName(this.listService)],
          updateOn: 'blur'
        })
      });
      const sData ={
        pregId: item.pregId ,
        pwCheck: item.pwCheck,
        pwMonth: item.pwMonth,
        pregDate: item.pregDate,
        childBirthDate: item.childBirthDate,
        birthType: item.birthType,
        childCount: item.childCount,
        childId: item.childId,
        startMonth: item.startMonth,
        childFamilyName: item.childFamilyName,
        childFirstName: item.childFirstName,
        childThirdName: item.childThirdName,
        pregDescr: item.pregDescr,
        phpSchema1: item.phpSchema1,
        phpSchema2: item.phpSchema2,
        phpSchema3: item.phpSchema3, 
      }
      
      this.subs.push(sForm)
      this.isValid.emit(true);
      this.pervValue.push(sData)
    }
    this.formS.get('newPregId').setValue(null)
    this.formS.get('newPregId').markAsPristine()
    this.formS.get('newPwCheck').setValue(null)
    this.formS.get('newPwCheck').markAsPristine()
    this.formS.get('newPwMonth').setValue(null)
    this.formS.get('newPwMonth').markAsPristine()
    this.formS.get('newPregDate').setValue(null)
    this.formS.get('newPregDate').markAsPristine()
    this.formS.get('newChildBirthDate').setValue(null)
    this.formS.get('newChildBirthDate').markAsPristine()
    this.formS.get('newBirthType').setValue(null)
    this.formS.get('newBirthType').markAsPristine()
    this.formS.get('newChildCount').setValue(null)
    this.formS.get('newChildCount').markAsPristine()
    this.formS.get('newChildId').setValue(null)
    this.formS.get('newChildId').markAsPristine()
    this.formS.get('newStartMonth').setValue(null)
    this.formS.get('newStartMonth').markAsPristine()
    this.formS.get('newChildFamilyName').setValue(null)
    this.formS.get('newChildFamilyName').markAsPristine()
    this.formS.get('newChildFirstName').setValue(null)
    this.formS.get('newChildFirstName').markAsPristine()
    this.formS.get('newChildThirdName').setValue(null)
    this.formS.get('newChildThirdName').markAsPristine()
    this.formS.get('newPregDescr').setValue(null)
    this.formS.get('newPregDescr').markAsPristine()
    this.formS.get('newPhpSchema1').setValue(null)
    this.formS.get('newPhpSchema1').markAsPristine()
    this.formS.get('newPhpSchema2').setValue(null)
    this.formS.get('newPhpSchema2').markAsPristine()
    this.formS.get('newPhpSchema3').setValue(null)
    this.formS.get('newPhpSchema3').markAsPristine()
  }

  update(){
    let oldValue = this.pervValue;
    let curValue = this.formS.controls['subs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
    
        if(curValue[index].startMonth == null || curValue[index].startMonth.length == 0)
          curValue[index].startMonth = null

        if(curValue[index].pwMonth == null || curValue[index].pwMonth.length == 0)
          curValue[index].pwMonth = null

        if(curValue[index].childId == null || curValue[index].childId.length == 0)
          curValue[index].childId = null

        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          let item: pcPregM ={
            patientId: this.patientId,
            pregIdOld: oldValue[index].pregId,
            pregId: curValue[index].pregId,
            pwCheck: curValue[index].pwCheck,
            pwMonth: curValue[index].pwMonth,
            pregDate: curValue[index].pregDate,
            childBirthDate: curValue[index].childBirthDate,
            birthType: curValue[index].birthType,
            childCount: curValue[index].childCount,
            childId: curValue[index].childId,
            startMonth: curValue[index].startMonth,
            childFamilyName: curValue[index].childFamilyName,
            childFirstName: curValue[index].childFirstName,
            childThirdName: curValue[index].childThirdName,
            pregDescr: curValue[index].pregDescr,
            phpSchema1: curValue[index].phpSchema1,
            phpSchema2: curValue[index].phpSchema2,
            phpSchema3: curValue[index].phpSchema3
          }
          this.patientService.updatePregM(item).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }

  writeInd(i: number, fiel: number){
    this.indForUpd = i
    this.fielForUpd = fiel
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.updSchema && !changes.updSchema.firstChange) {
      if(this.indForUpd == -1){
        switch(this.fielForUpd){
          case 1:{
            this.formS.get('newPhpSchema1').setValue(this.updSchema)
            this.formS.get('newPhpSchema1').touched
            break
          }
          case 2:{
            this.formS.get('newPhpSchema2').setValue(this.updSchema)
            this.formS.get('newPhpSchema2').touched
            break
          }
          case 3:{
            this.formS.get('newPhpSchema3').setValue(this.updSchema)
            this.formS.get('newPhpSchema3').touched
            break
          }
        }
        return null
      }
      switch(this.fielForUpd){
        case 1:{
          this.subs.controls[this.indForUpd].get('phpSchema1').setValue(this.updSchema)
          this.subs.controls[this.indForUpd].get('phpSchema1').touched
          break
        }
        case 2:{
          this.subs.controls[this.indForUpd].get('phpSchema2').setValue(this.updSchema)
          this.subs.controls[this.indForUpd].get('phpSchema2').touched
          break
        }
        case 3:{
          this.subs.controls[this.indForUpd].get('phpSchema3').setValue(this.updSchema)
          this.subs.controls[this.indForUpd].get('phpSchema3').touched
          break
        }
      }
    }
  }
}
