import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.css']
})
export class SelectListComponent implements OnInit{
  form: FormGroup;
  arr = new FormArray([]);
  
  @Input() modalList: string[]
  @Output() list = new EventEmitter<string[]>();


  constructor(
    private fb: FormBuilder,
    public modal: ModalService
  ){}

  ngOnInit() {
    this.modalList.forEach(item => {
      if(item  != null){
        const sForm = new FormGroup ({
          select: new FormControl(true),
          name: new FormControl(item)
        })
        this.arr.push(sForm)
      }
    });

    this.form = this.fb.group({
      formArr: this.arr as FormArray
    })
    
  }

  get formArr (){
    return this.form.get('formArr') as FormArray
  }

  close(){    
    let countSelect = 0
    let lst: string[] = []
    this.formArr.value.forEach(item => {
      if(item.select == true){
        lst.push(item.name)
        countSelect++
      }
    });
    
    if (this.modalList.length == countSelect) {
      lst = ['Все']
      this.list.emit(lst)
      this.modal.close()
      return null
    }
    this.list.emit(lst)
    this.modal.close()
  }

  markAll(){
    this.formArr.controls.forEach((item:FormGroup) =>{
      item.controls['select'].setValue(true)
    })
  }

  dismarkAll(){
    this.formArr.controls.forEach((item:FormGroup) =>{
      item.controls['select'].setValue(false)
    })
  }
}
