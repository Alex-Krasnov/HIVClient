import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { List2Col, Row2Col } from 'src/app/_interfaces/list-2-col.model';
import { CureSchemaService } from 'src/app/services/lists-services/cure-schema.service';
import { ListSharedServiceService } from 'src/app/services/lists-services/list-shared-service.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-cure-schema',
  templateUrl: './cure-schema.component.html',
  styleUrls: ['./cure-schema.component.css']
})
export class CureSchemaComponent implements OnInit {
  IsErr: boolean = false;
  needUpd: boolean = false;
  listData: List2Col | undefined;
  listForm: FormGroup;
  listArray = new FormArray([]);
  pervValue: any;
  schemaId: number;
  modalType: string;
  schemaName: string;
  ind?:number = null;

  constructor(
    private listService: CureSchemaService,
    private fb: FormBuilder,
    public shared: ListSharedServiceService,
    public modal: ModalService
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
    this.shared.setNameList('Схема терапии')
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
    this.modalType = 'create'
    this.schemaName = null
    this.schemaId = this.listData.maxId+1;
    this.modal.listCureSchemaOpen()
  }

  editRow(index: number){
    this.modalType = 'edit'
    this.schemaName = this.subs.at(index).get('longName').value
    this.schemaId = this.subs.at(index).get('id').value
    this.ind = index
    this.modal.listCureSchemaOpen()
  }

  async updateRow(){
    let oldValue = this.pervValue;
    let curValue = this.listForm.controls['subs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue))){
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          let resUpdate = await firstValueFrom(this.listService.update(curValue[index].id,curValue[index].longName,curValue[index].shortName))
          if(resUpdate == 'e'){
            this.subs.at(index).get('longName').setValue(oldValue[index].longName)
            this.subs.at(index).get('shortName').setValue(oldValue[index].shortName)
            return null
          }
          oldValue[index] = curValue[index]
        }
      } 
    }
  }

  giveSchema(schema: string){

    if(this.modalType == 'create'){
      const rowForm = new FormGroup ({
        id: new FormControl(this.listData.maxId+1),
        longName: new FormControl(schema, {updateOn: 'blur'}),
        shortName: new FormControl(null, {updateOn: 'blur'})
      });
  
      const rowData = {
        id: this.listData.maxId+1,
        longName: schema,
        shortName: null
      }
  
      this.subs.push(rowForm)
      this.pervValue.push(rowData);
      this.listData.maxId += this.listData.maxId
      
      this.listForm.get('newId').setValue(this.listData.maxId+1)
      this.listForm.get('newLongName').setValue(null)
      this.listForm.get('newShortName').setValue(null)
  
      this.listForm.get('newId').markAsPristine()
      this.listForm.get('newLongName').markAsPristine()
      this.listForm.get('newShortName').markAsPristine()
      return null
    }

    this.pervValue[this.ind].longName = schema

    this.subs.at(this.ind).get('longName').setValue(schema)
    this.subs.at(this.ind).get('longName').markAsPristine()
  }
}