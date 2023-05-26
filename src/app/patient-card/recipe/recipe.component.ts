import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { pcRecipe } from 'src/app/_interfaces/pc-recipe.model';
import { ListService } from 'src/app/services/list.service';
import { PatientCardRecipeService } from 'src/app/services/patient-card-recipe.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit{
  formS: FormGroup;
  pervValue: any;
  @Input() subArr: FormArray;
  @Input() patientId: number;
  @Output() isValid = new EventEmitter<boolean>();

  constructor(
    private patientService: PatientCardRecipeService,
    private fb: FormBuilder,
    private listService: ListService
  ){}

  ngOnInit() {
    this.isValid.emit(true);
    this.formS = this.fb.group({
      subs: this.subArr as FormArray,
      newSer: new FormControl(),
      newNum: new FormControl(),
      newPrescrDate: new FormControl(),
      newDoctor: new FormControl('', {
        asyncValidators: [InList.validateDoctor(this.listService)],
        updateOn: 'blur'
      }),
      newMedicine: new FormControl('', {
        asyncValidators: [InList.validateMedicine(this.listService)],
        updateOn: 'blur'
      }),
      newPackNum: new FormControl(),
      newFinSource: new FormControl('', {
        asyncValidators: [InList.validateFinSource(this.listService)],
        updateOn: 'blur'
      }),
      newGiveDate: new FormControl(),
      newGiveDateCheck: new FormControl(),
      newMedicineGive: new FormControl(),
      newPackNumGive: new FormControl()
    },{updateOn: 'blur'});

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
    this.patientService.delRecipe(this.patientId, e.get('ser').value, e.get('num').value).subscribe();
    this.pervValue.splice(index, 1);
    this.subs.removeAt(index);
  }

  create() {
    
    if(this.formS.controls['newDoctor'].valid && 
    this.formS.controls['newMedicine'].valid && 
    this.formS.controls['newFinSource'].valid && 
    this.formS.controls['newSer'].value.length != 0 && 
    this.formS.controls['newNum'].value.length != 0){
      
      let item: pcRecipe = {
        patientId: this.patientId,
        ser: this.formS.controls['newSer'].value,
        num: this.formS.controls['newNum'].value,
        prescrDate: this.formS.controls['newPrescrDate'].value,
        doctor: this.formS.controls['newDoctor'].value,
        medicine: this.formS.controls['newMedicine'].value,
        packNum: this.formS.controls['newPackNum'].value,
        finSource: this.formS.controls['newFinSource'].value,
        giveDate: this.formS.controls['newGiveDate'].value,
        giveDateCheck: this.formS.controls['newGiveDateCheck'].value,
        medicineGive: this.formS.controls['newMedicineGive'].value,
        packNumGive: this.formS.controls['newPackNumGive'].value
      };

      this.patientService.createRecipe(item).subscribe()
      
      const sForm = new FormGroup ({
        ser: new FormControl(item.ser, Validators.required),
        num: new FormControl(item.num, Validators.required),
        prescrDate: new FormControl(item.prescrDate),
        doctor: new FormControl(item.doctor, {
          asyncValidators: [InList.validateDoctor(this.listService)],
          updateOn: 'blur'
        }),
        medicine: new FormControl(item.medicine, {
          asyncValidators: [InList.validateMedicine(this.listService)],
          updateOn: 'blur'
        }),
        packNum: new FormControl(item.packNum),
        finSource: new FormControl(item.finSource, {
          asyncValidators: [InList.validateFinSource(this.listService)],
          updateOn: 'blur'
        }),
        giveDate: new FormControl(item.giveDate),
        giveDateCheck: new FormControl(item.giveDateCheck),
        medicineGive: new FormControl(item.medicineGive),
        packNumGive: new FormControl(item.packNumGive)
      });

      const sData ={
        ser: item.ser,
        num: item.num,
        prescrDate: item.prescrDate,
        doctor: item.doctor,
        medicine: item.medicine,
        packNum: item.packNum,
        finSource: item.finSource,
        giveDate: item.giveDate,
        giveDateCheck: item.giveDateCheck,
        medicineGive: item.medicineGive,
        packNumGive: item.packNumGive
      }
      
      this.subs.push(sForm)
      this.isValid.emit(true);
      this.pervValue.push(sData)
    }
    this.formS.get('newSer').setValue('')
    this.formS.get('newSer').markAsPristine()
    this.formS.get('newNum').setValue('')
    this.formS.get('newNum').markAsPristine()
    this.formS.get('newPrescrDate').setValue('')
    this.formS.get('newPrescrDate').markAsPristine()

    this.formS.get('newDoctor').setValue('')
    this.formS.get('newDoctor').markAsPristine()
    this.formS.get('newMedicine').setValue('')
    this.formS.get('newMedicine').markAsPristine()
    this.formS.get('newPackNum').setValue('')
    this.formS.get('newPackNum').markAsPristine()
    this.formS.get('newFinSource').setValue('')
    this.formS.get('newFinSource').markAsPristine()
    this.formS.get('newGiveDate').setValue('')
    this.formS.get('newGiveDate').markAsPristine()
    this.formS.get('newGiveDateCheck').setValue('')
    this.formS.get('newGiveDateCheck').markAsPristine()
    this.formS.get('newMedicineGive').setValue('')
    this.formS.get('newMedicineGive').markAsPristine()
    this.formS.get('newPackNumGive').setValue('')
    this.formS.get('newPackNumGive').markAsPristine()
  }

  update(){
    let oldValue = this.pervValue;
    let curValue = this.formS.controls['subs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){

          let item: pcRecipe = {
            patientId: this.patientId,
            ser: curValue[index].ser,
            num: curValue[index].num,
            prescrDate: curValue[index].prescrDate,
            doctor: curValue[index].doctor,
            medicine: curValue[index].medicine,
            packNum: curValue[index].packNum,
            finSource: curValue[index].finSource,
            giveDate: curValue[index].giveDate,
            giveDateCheck: curValue[index].giveDateCheck,
            medicineGive: curValue[index].medicineGive,
            packNumGive: curValue[index].packNumGive,
            serOld: oldValue[index].ser,
            numOld: oldValue[index].num,
          };

          this.patientService.updateRecipe(item).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }
}
