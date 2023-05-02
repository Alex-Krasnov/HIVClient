import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-diagnostics3-col',
  templateUrl: './diagnostics3-col.component.html',
  styleUrls: ['./diagnostics3-col.component.css']
})
export class Diagnostics3ColComponent implements OnInit{
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
