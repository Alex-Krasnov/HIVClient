import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CureSchemas } from 'src/app/_interfaces/cure-schemas.model';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';
import { PatientCardTreatmentService } from 'src/app/services/patient-card-treatment.service';
import { endDateValidator } from 'src/app/validators/cure-schema';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-patient-cure-schemas',
  templateUrl: './patient-cure-schemas.component.html',
  styleUrls: ['./patient-cure-schemas.component.css']
})
export class PatientCureSchemasComponent implements OnInit, OnChanges{
  formCS: FormGroup;
  pervValue: any;
  indForUpd: number;
  cureSchemaArr = new FormArray([]);
  @Input() cureSchemaFormArr: CureSchemas[]; 
  @Input() patientId: number;
  @Input() updSchema: string;
  @Output() csIsValid = new EventEmitter<boolean>();

  constructor(
    private patientService: PatientCardTreatmentService,
    private fb: FormBuilder,
    private listService: ListService,
    public modal: ModalService
  ){}

  ngOnInit() {
    this.csIsValid.emit(true);
    this.createArr()
    this.formCS = this.fb.group({
      cureSchemas: this.cureSchemaArr as FormArray,
      newCureSchemaName: new FormControl('', {
        asyncValidators: [InList.validateCureSchemaName(this.listService)],
        updateOn: 'blur'
      }),
      newCureChangeName: new FormControl('', {
        asyncValidators: [InList.validateCureChangeName(this.listService)],
        updateOn: 'blur'
      }),
      newRangeTherapy: new FormControl('', {
        asyncValidators: [InList.validateRangeTherapy(this.listService)],
        updateOn: 'blur'
      }),
      newStartDate: new FormControl(),
      newEndDate: new FormControl(),
      newSchemaComm: new FormControl(),
      newProtNum: new FormControl(),
      newLast: new FormControl({value: null, disabled: true})
    }, {updateOn: 'blur'}
  );
    this.pervValue = this.cureSchemaArr.getRawValue();

    this.formCS.controls['cureSchemas'].statusChanges.subscribe(() => {      
      this.checkValidLast()
      if (this.formCS.controls['cureSchemas'].valid){
        this.updateCureSchemas();
        this.csIsValid.emit(true);
      } else 
        this.csIsValid.emit(false);

      let countLast = 0

      this.cureSchemas.controls.forEach(item => {
        if(item.get('last').value == true)
          countLast += 1
      });

      if(countLast>1 || countLast == 0)
        this.csIsValid.emit(false)
    })
  }

  get cureSchemas() {
    return this.formCS.get('cureSchemas') as FormArray;
  }

  delCureSchemas(index: number) {
    let e = this.cureSchemas.at(index);
    
    this.patientService.delCureSchemas(this.patientId, e.get('cureSchemaName').value, e.get('startDate').value).subscribe();
    this.pervValue.splice(index, 1);
    this.cureSchemas.removeAt(index);

    this.checkValidLast()
  }

  createCureSchemas() {
    let name = this.formCS.get('newCureSchemaName').value
    let date = this.formCS.get('newStartDate').value
    let cureChangeName = this.formCS.get('newCureChangeName').value
    let rangeTherapy = this.formCS.get('newRangeTherapy').value
    let endDate = this.formCS.get('newEndDate').value
    let schemaComm = this.formCS.get('newSchemaComm').value
    let protNum = this.formCS.get('newProtNum').value
    let last = true

    if(name == null || date == null || name.length == 0){
      confirm("Поля Схема терапии и Дата начала обязательны к заполнению")
      return
    }

    if(this.formCS.controls['newCureSchemaName'].valid && 
    this.formCS.controls['newCureChangeName'].valid && 
    this.formCS.controls['newRangeTherapy'].valid &&
    this.formCS.controls['newCureSchemaName'].value.length != 0 &&
    this.formCS.controls['newStartDate'].value.length != 0){

      const sForm = new FormGroup ({
        cureSchemaName: new FormControl(name, {
          asyncValidators: [InList.validateCureSchemaName(this.listService)],
          updateOn: 'blur'
        }),
        cureChangeName: new FormControl(cureChangeName, {
          asyncValidators: [InList.validateCureChangeName(this.listService)],
          updateOn: 'blur'
        }),
        rangeTherapy: new FormControl(rangeTherapy, {
          asyncValidators: [InList.validateRangeTherapy(this.listService)],
          updateOn: 'blur'
        }),
        startDate: new FormControl(date),
        endDate: new FormControl(endDate),
        schemaComm: new FormControl(schemaComm),
        protNum: new FormControl(protNum),
        last: new FormControl({value: last, disabled: true})
      }, { 
        validators: endDateValidator(),
        updateOn: 'blur'
      });
      const sData ={
        cureSchemaName: name,
        cureChangeName: cureChangeName,
        rangeTherapy: rangeTherapy,
        startDate: date,
        endDate: endDate,
        schemaComm: schemaComm,
        protNum: protNum,
        last: last
      }

      this.patientService.createCureSchemas(this.patientId, name, date, endDate, schemaComm, cureChangeName, protNum, rangeTherapy, last)
      .subscribe()
      
      this.cureSchemas.push(sForm)
      this.pervValue.push(sData)
      this.csIsValid.emit(true)
      this.checkValidLast()
    }
    
    this.formCS.get('newCureSchemaName').setValue('')
    this.formCS.get('newCureSchemaName').markAsPristine()
    this.formCS.get('newStartDate').setValue('')
    this.formCS.get('newStartDate').markAsPristine()
    this.formCS.get('newCureChangeName').setValue('')
    this.formCS.get('newCureChangeName').markAsPristine()
    this.formCS.get('newRangeTherapy').setValue('')
    this.formCS.get('newRangeTherapy').markAsPristine()
    this.formCS.get('newEndDate').setValue('')
    this.formCS.get('newEndDate').markAsPristine()
    this.formCS.get('newSchemaComm').setValue('')
    this.formCS.get('newSchemaComm').markAsPristine()
    this.formCS.get('newProtNum').setValue('')
    this.formCS.get('newProtNum').markAsPristine()
    this.formCS.get('newLast').setValue('')
    this.formCS.get('newLast').markAsPristine()
  }

  async updateCureSchemas(){
    let oldValue = this.pervValue;
    let curValue = this.formCS.controls['cureSchemas'].getRawValue();
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          
          let a = await firstValueFrom(this.patientService.updateCureSchemas
          (
            this.patientId,
            curValue[index].cureSchemaName,
            curValue[index].startDate,
            curValue[index].endDate,
            curValue[index].schemaComm,
            curValue[index].cureChangeName,
            curValue[index].protNum,
            curValue[index].rangeTherapy,
            curValue[index].last,
            oldValue[index].cureSchemaName,
            oldValue[index].startDate
          ))
          this.pervValue[index] = curValue[index]
        }
      } 
  }

  checkValidLast(){
    let countUpd = 0

    this.cureSchemas.controls.forEach( (item, index) => {
      if(item.get('last').value == true){
        this.cureSchemas.at(index).get('last').setValue(false,{ emitEvent: false })
        countUpd += 1
      }
    })

    let countLast = 0
    let maxInd = this.cureSchemas.length -1

    this.cureSchemas.controls.forEach(item => {
      if(item.get('last').value == true)
        countLast += 1
    })

    if(countLast == 0)
      this.cureSchemas.at(maxInd).get('last').setValue(true,{ emitEvent: false })

    if(countUpd>0)
      this.updateCureSchemas()
    
  }

  writeInd(i: number){
    this.indForUpd = i
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.updSchema && !changes.updSchema.firstChange) {
      if(this.indForUpd == -1){
        this.formCS.get('newCureSchemaName').setValue(this.updSchema)
        this.formCS.get('newCureSchemaName').touched
        return null
      }
      this.cureSchemas.controls[this.indForUpd].get('cureSchemaName').setValue(this.updSchema)
      this.cureSchemas.controls[this.indForUpd].get('cureSchemaName').touched
    }
  }

  createArr(){
    this.cureSchemaFormArr.map(
      (cur: any) => {
        const curForm = new FormGroup ({
          cureSchemaName: new FormControl(cur.cureSchemaName, {
            validators: Validators.required,
            asyncValidators: [InList.validateCureSchemaName(this.listService)],
            updateOn: 'blur'
          }),
          cureChangeName: new FormControl(cur.cureChangeName, {
            asyncValidators: [InList.validateCureChangeName(this.listService)],
            updateOn: 'blur'
          }),
          rangeTherapy: new FormControl(cur.rangeTherapy, {
            asyncValidators: [InList.validateRangeTherapy(this.listService)],
            updateOn: 'blur'
          }),
          startDate: new FormControl(cur.startDate, Validators.required),
          endDate: new FormControl(cur.endDate),
          schemaComm: new FormControl(cur.schemaComm),
          protNum: new FormControl(cur.protNum),
          last: new FormControl({value: cur.last, disabled: true})
        }, { 
          validators: endDateValidator(),
          updateOn: 'blur' });
        this.cureSchemaArr.push(curForm);
      }
    )
  }
}
