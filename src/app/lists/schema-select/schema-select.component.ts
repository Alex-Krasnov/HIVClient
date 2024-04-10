import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { MedForSchema } from 'src/app/_interfaces/med-for-schema.model';
import { SelectSchemaModel } from 'src/app/_interfaces/select-schema.model';
import { CureSchemaService } from 'src/app/services/lists-services/cure-schema.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-list-schema-select',
  templateUrl: './schema-select.component.html',
  styleUrls: ['./schema-select.component.css']
})
export class SchemaSelectComponent implements OnInit{
  data: MedForSchema[] | undefined;
  form: FormGroup;
  arr = new FormArray([]);
  selectedMedicine: number[] = [];
  possibleSchems: number[] = [];


  @Input() schemaId: number
  @Input() modalType: string
  @Input() schemaName: string
  @Output() schema = new EventEmitter<string>();

  constructor(
    private service: CureSchemaService,
    private fb: FormBuilder,
    public modal: ModalService
  ){}
  
  ngOnInit() {
    this.getData()
    this.form = this.fb.group({
      formArr: this.arr as FormArray,
      schemaName: new FormControl(this.schemaName)
    })
  }

  getData(): void {
    this.service.getStructureSchema(this.schemaId)
      .subscribe((data:MedForSchema[]) => {
        this.data = data;
        this.initForm();
      });
  }

  initForm(){
    this.data.map(
      (item: MedForSchema) => {
        const sForm = new FormGroup ({
          name: new FormControl({value: item.name, disabled: true}),
          id: new FormControl(item.id),
          includeFlg: new FormControl(item.includeFlg)
        });
        this.arr.push(sForm);
      }
    );
  }

  get formArr (){
    return this.form.get('formArr') as FormArray
  }

  async confirm(){
    let meds: number[] = []

    this.formArr.value.map(data => {
      if(data.includeFlg == true)
        meds.push(data.id)
    })

    if(this.modalType == 'create'){
      let resCreate = await firstValueFrom(this.service.createSchema(this.schemaId,this.form.get('schemaName').value,meds))
      if(resCreate == 'e')      
        return null

      this.schema.emit(this.form.get('schemaName').value)
      this.modal.close()   
      return null
    }

    let resCreate = await firstValueFrom(this.service.updateSchema(this.schemaId,this.form.get('schemaName').value,meds))
    if(resCreate == 'e')      
      return null

    this.schema.emit(this.form.get('schemaName').value)
    this.modal.close()   
    return null
  }
}
