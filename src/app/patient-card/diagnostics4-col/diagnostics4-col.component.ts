import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-diagnostics4-col',
  templateUrl: './diagnostics4-col.component.html',
  styleUrls: ['./diagnostics4-col.component.css']
})
export class Diagnostics4ColComponent implements OnInit{
  formS: FormGroup;
  @Input() subArr: FormArray; 

  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit() {
    this.formS = this.fb.group({
      subs: this.subArr as FormArray
    });
  }

  get subs() {
     return this.formS.get('subs') as FormArray;
  }
}
