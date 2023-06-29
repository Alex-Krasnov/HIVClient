import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Course } from 'src/app/_interfaces/course.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-select-list2-col',
  templateUrl: './select-list2-col.component.html',
  styleUrls: ['./select-list2-col.component.css']
})
export class SelectList2ColComponent implements OnInit{
  form: FormGroup;
  arr = new FormArray([]);
  
  @Input() modalList: Course[]
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
          short: new FormControl(item.short),
          long: new FormControl(item.long)
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
        lst.push(item.long)
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
