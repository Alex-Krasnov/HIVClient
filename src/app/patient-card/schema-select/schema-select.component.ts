import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { SelectSchemaModel } from 'src/app/_interfaces/select-schema.model';
import { ModalService } from 'src/app/services/modal.service';
import { SelectSchemaService } from 'src/app/services/select-schema.service';

@Component({
  selector: 'app-schema-select',
  templateUrl: './schema-select.component.html',
  styleUrls: ['./schema-select.component.css']
})
export class SchemaSelectComponent implements OnInit{
  data: SelectSchemaModel[] | undefined;
  form: FormGroup;
  arr = new FormArray([]);
  selectedMedicine: number[] = [];
  possibleSchems: number[] = [];
  msg: string = 'Выберите препараты';

  @Output() schema = new EventEmitter<string>();

  constructor(
    private patientService: SelectSchemaService,
    private fb: FormBuilder,
    public modal: ModalService
  ){}
  
  ngOnInit() {
    this.getData()
    this.form = this.fb.group({
      formArr: this.arr as FormArray
    })
  }

  getData(): void {
    this.patientService.getData()
      .subscribe((data:SelectSchemaModel[]) => {
        this.data = data;
        this.initForm();
      });
  }

  initForm(){
    this.data.map(
        (medicine: SelectSchemaModel) => {
          const sForm = new FormGroup ({
            name: new FormControl({value: medicine.medicineName, disabled: true}),
            select: new FormControl(false),
            schemaId: new FormControl(medicine.schemaId)
          });
          this.arr.push(sForm);
        }
    );
    this.arr.valueChanges
    .subscribe((item: FormGroup[]) => {

      const indexes = this.arr.controls.reduce((acc, control, index) => {
        if (control.get('select').value === true) {
          acc.push(index);
        }
        return acc;
      }, []);
      this.selectedMedicine = indexes
      this.setlst()
    })
  }

  get formArr (){
    return this.form.get('formArr') as FormArray
  }

  setlst(){
    this.possibleSchems = []
    this.selectedMedicine.forEach(e => {
      
      if( this.possibleSchems.length == 0){
        this.possibleSchems = this.data[e].schemaId
      }else{
        this.possibleSchems = this.possibleSchems.filter( i => this.data[e].schemaId.includes(i))
      }
    })
    this.arr
  }

  async setSchema(){
    if(this.selectedMedicine.length == 0){
      this.msg = 'Выберите препараты'      
    }else{
      let lst: number[] = []

      this.selectedMedicine.forEach(e => {
      lst.push(this.data[e].id)
      })
      // this.patientService.getSchema(lst).subscribe()
      let a = await firstValueFrom(this.patientService.getSchema(lst))
      this.msg = a.b
    }
  }

  exit(){
    if(this.msg == 'Выберите препараты' || this.msg.length == 0){
      this.msg = 'Выберите препараты'
      return null
    }

    this.schema.emit(this.msg)
    this.modal.close()
  }
}
