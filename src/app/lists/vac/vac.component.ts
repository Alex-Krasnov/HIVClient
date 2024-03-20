import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { List2Col, Row2Col } from 'src/app/_interfaces/list-2-col.model';
import { ListSharedServiceService } from 'src/app/services/lists-services/list-shared-service.service';
import { PlaceCheckService } from 'src/app/services/lists-services/place-check.service';
import { VacService } from 'src/app/services/lists-services/vac.service';

@Component({
  selector: 'app-vac',
  templateUrl: './vac.component.html',
  styleUrls: ['./vac.component.css']
})
export class VacComponent implements OnInit {
  IsErr: boolean = false;
  needUpd: boolean = false;
  listData: List2Col | undefined;
  listForm: FormGroup;
  listArray = new FormArray([]);
  pervValue: any;


  constructor(
    private listService: VacService,
    private fb: FormBuilder,
    public shared: ListSharedServiceService
  ){}

  ngOnInit() {
    this.getData()
  }

  getData(): void {
    this.listService.getData()
      .subscribe((data:List2Col) => {
        this.listData = data;
        this.pervValue = data.list;
        this.initForm();
      });
  }

  initForm(){
    this.shared.setNameList('Наименование вакцины')
    this.listData.list.map(
      (item: Row2Col) => {
        const itemForm = new FormGroup ({
          id: new FormControl(item.id),
          longName: new FormControl(item.longName, {updateOn: 'blur'})
        });
        this.listArray.push(itemForm);
      })

    this.listForm = this.fb.group({
      subs: this.listArray as FormArray,
      newId: new FormControl(this.listData.maxId+1),
      newLongName: new FormControl(null, {updateOn: 'blur'})
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
    if(confirm(`Вы уверены, что хотите удалить: ${this.subs.at(index).get('longName').value}`)==false)
      return null

    if(await firstValueFrom(this.listService.del(this.subs.at(index).get('longName').value)) == 'e')
      return null
    
    this.pervValue.splice(index, 1)
    this.subs.removeAt(index)
  }

  createRow(){
    let Id = this.listForm.get('newId').value
    let LongName = this.listForm.get('newLongName').value

    console.log();
    if(JSON.stringify(this.pervValue).indexOf(LongName) != -1){
      confirm(`Запись ${LongName} уже существует`)
      this.listForm.get('newLongName').setValue(null)
      this.listForm.get('newLongName').markAsPristine()
      return null
    }

    const rowForm = new FormGroup ({
      id: new FormControl(Id),
      longName: new FormControl(LongName, {updateOn: 'blur'})
    });

    const rowData = {
      id: Id,
      longName: LongName
    }

    this.listService.create(Id, LongName, null).subscribe()

    this.subs.push(rowForm)
    this.pervValue.push(rowData);
    
    this.listForm.get('newId').setValue(Id+1)
    this.listForm.get('newLongName').setValue(null)

    this.listForm.get('newId').markAsPristine()
    this.listForm.get('newLongName').markAsPristine()
  }

  updateRow(){
    let oldValue = this.pervValue;
    let curValue = this.listForm.controls['subs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue))){
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          this.listService.update(curValue[index].id,curValue[index].longName,null).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
    }
  }
}