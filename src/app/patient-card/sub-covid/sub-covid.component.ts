import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { PatientCardCovidService } from 'src/app/services/patient-card-covid.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-sub-covid',
  templateUrl: './sub-covid.component.html',
  styleUrls: ['./sub-covid.component.css']
})
export class SubCovidComponent implements OnInit{
  formS: FormGroup;
  pervValue: any;
  @Input() subArr: FormArray; 
  @Input() patientId: number;
  @Input() type: number;
  @Output() isValid = new EventEmitter<boolean>();

  constructor(
    private patientService: PatientCardCovidService,
    private fb: FormBuilder,
    private listService: ListService
  ){}

  ngOnInit() {
    this.isValid.emit(true);
    this.formS = this.fb.group({
      subs: this.subArr as FormArray,
      newComm: new FormControl(),
      newNameShort: new FormControl('', {
        asyncValidators: [InList.validateFullMkb10Short(this.listService)],
        updateOn: 'blur'
      }),
      newNameLong: new FormControl('', {
        asyncValidators: [InList.validateFullMkb10Long(this.listService)],
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
    
    switch (this.type) 
    {
      case 1:{
        this.patientService.delOtherDiag(e.get('id').value).subscribe();
        break
      }
      case 2:{
        this.patientService.delPatDiag(e.get('id').value).subscribe();
        break
      }
    }
    this.pervValue.splice(index, 1);
    this.subs.removeAt(index);
  }

  async create() {
    if(this.formS.controls['newNameShort'].valid && this.formS.controls['newNameLong'].valid){
      
      let nameShort = this.formS.get('newNameShort').value
      let nameLong = this.formS.get('newNameLong').value
      let comm = this.formS.get('newComm').value
      let id;

      switch (this.type) 
      {
        case 1:{
          id = await firstValueFrom(this.patientService.createOtherDiag(this.patientId, nameShort, comm))
          break
        }
        case 2:{
          id = await firstValueFrom(this.patientService.createPatDiag(this.patientId, nameShort, comm))
          break
        }
      }

      const sForm = new FormGroup ({
        id: new FormControl(id),
        comm: new FormControl(comm),
        nameShort: new FormControl(nameShort, {
          asyncValidators: [InList.validateFullMkb10Short(this.listService)],
          updateOn: 'blur'
        }),
        nameLong: new FormControl(nameLong, {
          asyncValidators: [InList.validateFullMkb10Long(this.listService)],
          updateOn: 'blur'
        })
      });
      const sData ={
        id: id,
        comm: comm,
        nameShort: nameShort,
        nameLong: nameLong
      }
      
      this.subs.push(sForm)
      this.isValid.emit(true);
      this.pervValue.push(sData)
    }
    this.formS.get('newNameShort').setValue('')
    this.formS.get('newNameShort').markAsPristine()
    this.formS.get('newNameLong').setValue('')
    this.formS.get('newNameLong').markAsPristine()
    this.formS.get('newComm').setValue('')
    this.formS.get('newComm').markAsPristine()
  }

  update(){
    let oldValue = this.pervValue;
    let curValue = this.formS.controls['subs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          let id = curValue[index].id
          let comm = curValue[index].comm
          let nameShort = curValue[index].nameShort

          switch (this.type) 
          {
            case 1:{
              this.patientService.updateOtherDiag(id, nameShort, comm).subscribe()
              break
            }
            case 2:{
              this.patientService.updatePatDiag(id, nameShort, comm).subscribe()
              break
            }
          }
          oldValue[index] = curValue[index]
        }
      } 
  }
}