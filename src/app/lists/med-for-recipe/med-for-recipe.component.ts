import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { List3Col, Row3Col } from 'src/app/_interfaces/list-3-col.model';
import { CureChangeService } from 'src/app/services/lists-services/cure-change.service';
import { ListSharedServiceService } from 'src/app/services/lists-services/list-shared-service.service';
import { MedForRecipeService } from 'src/app/services/lists-services/med-for-recipe.service';

@Component({
  selector: 'app-med-for-recipe',
  templateUrl: './med-for-recipe.component.html',
  styleUrls: ['./med-for-recipe.component.css']
})
export class MedForRecipeComponent  implements OnInit {
  IsErr: boolean = false;
  needUpd: boolean = false;
  listData: List3Col | undefined;
  listForm: FormGroup;
  listArray = new FormArray([]);
  pervValue: any;


  constructor(
    private listService: MedForRecipeService,
    private fb: FormBuilder,
    public shared: ListSharedServiceService
  ){}

  ngOnInit() {
    this.getData()
  }

  getData(): void {
    this.listService.getData()
      .subscribe((data:List3Col) => {
        this.listData = data;
        this.pervValue = data.list;
        this.initForm();
      });
  }

  initForm(){
    this.shared.setNameList('Причина смены терапии')
    this.listData.list.map(
      (item: Row3Col) => {
        const itemForm = new FormGroup ({
          id: new FormControl(item.id),
          longName: new FormControl(item.longName, {updateOn: 'blur'}),
          isActive: new FormControl(item.isActive, {updateOn: 'blur'})
        });
        this.listArray.push(itemForm);
      })

    this.listForm = this.fb.group({
      subs: this.listArray as FormArray,
      newId: new FormControl(this.listData.maxId+1),
      newLongName: new FormControl(null, {updateOn: 'blur'}),
      newIsActive: new FormControl(null, {updateOn: 'blur'})
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
    let IsActive = this.listForm.get('newIsActive').value

    if(JSON.stringify(this.pervValue).indexOf(LongName) != -1){
      confirm(`Запись ${LongName} уже существует`)
      this.listForm.get('newLongName').setValue(null)
      this.listForm.get('newIsActive').setValue(null)
      this.listForm.get('newLongName').markAsPristine()
      this.listForm.get('newIsActive').markAsPristine()
      return null
    }

    const rowForm = new FormGroup ({
      id: new FormControl(Id),
      longName: new FormControl(LongName, {updateOn: 'blur'}),
      isActive: new FormControl(IsActive, {updateOn: 'blur'})
    });

    const rowData = {
      id: Id,
      longName: LongName,
      isActive: IsActive
    }

    this.listService.createMed(Id, LongName, IsActive).subscribe()

    this.subs.push(rowForm)
    this.pervValue.push(rowData);
    
    this.listForm.get('newId').setValue(Id+1)
    this.listForm.get('newLongName').setValue(null)
    this.listForm.get('newIsActive').setValue(null)

    this.listForm.get('newId').markAsPristine()
    this.listForm.get('newLongName').markAsPristine()
    this.listForm.get('newIsActive').markAsPristine()
  }

  updateRow(){
    let oldValue = this.pervValue;
    let curValue = this.listForm.controls['subs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue))){
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          this.listService.updateMed(curValue[index].id,curValue[index].longName,curValue[index].isActive).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
    }
  }
}
