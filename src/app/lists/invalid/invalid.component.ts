import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { List2Col, Row2Col } from 'src/app/_interfaces/list-2-col.model';
import { InvalidService } from 'src/app/services/lists-services/invalid.service';
import { ListSharedServiceService } from 'src/app/services/lists-services/list-shared-service.service';

@Component({
  selector: 'app-invalid',
  templateUrl: './invalid.component.html',
  styleUrls: ['./invalid.component.css']
})
export class InvalidComponent implements OnInit {
  IsErr: boolean = false;
  needUpd: boolean = false;
  listData: List2Col | undefined;
  listForm: FormGroup;
  listArray = new FormArray([]);
  pervValue: any;


  constructor(
    private listService: InvalidService,
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
    this.shared.setNameList('Гр. инвалидности')
    this.listData.list.map(
      (item: Row2Col) => {
        const itemForm = new FormGroup ({
          id: new FormControl(item.id),
          longName: new FormControl(item.longName, {updateOn: 'blur'}),
          shortName: new FormControl(item.shortName, {updateOn: 'blur'})
        });
        this.listArray.push(itemForm);
      })

    this.listForm = this.fb.group({
      subs: this.listArray as FormArray,
      newId: new FormControl(this.listData.maxId+1),
      newLongName: new FormControl(null, {updateOn: 'blur'}),
      newShortName: new FormControl(null, {updateOn: 'blur'})
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
    let ShortName = this.listForm.get('newShortName').value

    console.log();
    if(JSON.stringify(this.pervValue).indexOf(LongName) != -1){
      confirm(`Запись ${LongName} уже существует`)
      this.listForm.get('newLongName').setValue(null)
      this.listForm.get('newShortName').setValue(null)
      this.listForm.get('newLongName').markAsPristine()
      this.listForm.get('newShortName').markAsPristine()
      return null
    }

    const rowForm = new FormGroup ({
      id: new FormControl(Id),
      longName: new FormControl(LongName, {updateOn: 'blur'}),
      shortName: new FormControl(ShortName, {updateOn: 'blur'})
    });

    const rowData = {
      id: Id,
      longName: LongName,
      shortName: ShortName
    }

    this.listService.create(Id, LongName, ShortName).subscribe()

    this.subs.push(rowForm)
    this.pervValue.push(rowData);
    
    this.listForm.get('newId').setValue(Id+1)
    this.listForm.get('newLongName').setValue(null)
    this.listForm.get('newShortName').setValue(null)

    this.listForm.get('newId').markAsPristine()
    this.listForm.get('newLongName').markAsPristine()
    this.listForm.get('newShortName').markAsPristine()
  }

  updateRow(){
    let oldValue = this.pervValue;
    let curValue = this.listForm.controls['subs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue))){
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          this.listService.update(curValue[index].id,curValue[index].longName,curValue[index].shortName).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
    }
  }
}
