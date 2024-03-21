import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ListDoctor, RowDoctor } from 'src/app/_interfaces/list-doctor.model';
import { DoctorService } from 'src/app/services/lists-services/doctor.service';
import { ListSharedServiceService } from 'src/app/services/lists-services/list-shared-service.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  IsErr: boolean = false;
  needUpd: boolean = false;
  listData: ListDoctor | undefined;
  listForm: FormGroup;
  listArray = new FormArray([]);
  pervValue: any;


  constructor(
    private listService: DoctorService,
    private fb: FormBuilder,
    public shared: ListSharedServiceService
  ){}

  ngOnInit() {
    this.getData()
  }

  getData(): void {
    this.listService.getData()
      .subscribe((data:ListDoctor) => {
        this.listData = data;
        this.pervValue = data.list;
        this.initForm();
      });
  }

  initForm(){
    this.shared.setNameList('Пользователи')
    this.listData.list.map(
      (item: RowDoctor) => {
        const itemForm = new FormGroup ({
          id: new FormControl(item.id, {updateOn: 'blur'}),
          shortName: new FormControl(item.shortName, {updateOn: 'blur'}),
          longName: new FormControl(item.longName, {updateOn: 'blur'}),
          doctorCode: new FormControl(item.doctorCode, {updateOn: 'blur'}),
          doctorSnils: new FormControl(item.doctorSnils, {updateOn: 'blur'})
        });
        this.listArray.push(itemForm);
      })

    this.listForm = this.fb.group({
      subs: this.listArray as FormArray,
      newId: new FormControl(this.listData.maxId+1, {updateOn: 'blur'}),
      newShortName: new FormControl(null, {updateOn: 'blur'}),
      newLongName: new FormControl(null, {updateOn: 'blur'}),
      newDoctorCode: new FormControl(null, {updateOn: 'blur'}),
      newDoctorSnils: new FormControl(null, {updateOn: 'blur'})
    });

    this.listForm.controls['subs'].statusChanges.subscribe(() => {
      if (this.listForm.controls['subs'].valid){
        this.updateRow();
      }
    })
  }

  get subs() {
    return this.listForm.get('subs') as FormArray;
  }

  async delRow(index: number) {
    if(confirm(`Вы уверены, что хотите удалить: ${this.subs.at(index).get('id').value}`)==false)
      return null

    if(await firstValueFrom(this.listService.del(this.subs.at(index).get('id').value)) == 'e')
      return null
    
    this.pervValue.splice(index, 1)
    this.subs.removeAt(index)
  }

  createRow(){
    let doctor ={
      id: this.listForm.get('newId').value,
      shortName: this.listForm.get('newShortName').value,
      longName: this.listForm.get('newLongName').value,
      doctorCode: this.listForm.get('newDoctorCode').value,
      doctorSnils: this.listForm.get('newDoctorSnils').value
    }

    if(JSON.stringify(this.pervValue).indexOf(doctor.shortName) != -1){
      confirm(`Запись ${doctor.shortName} уже существует`)

      this.listForm.get('newId').setValue(null)
      this.listForm.get('newShortName').setValue(null)
      this.listForm.get('newLongName').setValue(null)
      this.listForm.get('newDoctorCode').setValue(null)
      this.listForm.get('newDoctorSnils').setValue(null)

      this.listForm.get('newId').markAsPristine()
      this.listForm.get('newShortName').markAsPristine()
      this.listForm.get('newLongName').markAsPristine()
      this.listForm.get('newDoctorCode').markAsPristine()
      this.listForm.get('newDoctorSnils').markAsPristine()
      return null
    }

    const rowForm = new FormGroup ({
      id: new FormControl(doctor.id, {updateOn: 'blur'}),
      shortName: new FormControl(doctor.shortName, {updateOn: 'blur'}),
      longName: new FormControl(doctor.longName, {updateOn: 'blur'}),
      doctorCode: new FormControl(doctor.doctorCode, {updateOn: 'blur'}),
      doctorSnils: new FormControl(doctor.doctorSnils, {updateOn: 'blur'})
    });

    const rowData = {
      id: doctor.id,
      shortName: doctor.shortName,
      longName: doctor.longName,
      doctorCode: doctor.doctorCode,
      doctorSnils: doctor.doctorSnils,
    }

    this.listService.create(doctor).subscribe()

    this.subs.push(rowForm)
    this.pervValue.push(rowData);
    
    this.listForm.get('newId').setValue(null)
    this.listForm.get('newShortName').setValue(null)
    this.listForm.get('newLongName').setValue(null)
    this.listForm.get('newDoctorCode').setValue(null)
    this.listForm.get('newDoctorSnils').setValue(null)

    this.listForm.get('newId').markAsPristine()
    this.listForm.get('newShortName').markAsPristine()
    this.listForm.get('newLongName').markAsPristine()
    this.listForm.get('newDoctorCode').markAsPristine()
    this.listForm.get('newDoctorSnils').markAsPristine()
  }

  updateRow(){
    let oldValue = this.pervValue;
    let curValue = this.listForm.controls['subs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue))){
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          this.listService.update(curValue[index]).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
    }
  }
}