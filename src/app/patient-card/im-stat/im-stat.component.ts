import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-im-stat',
  templateUrl: './im-stat.component.html',
  styleUrls: ['./im-stat.component.css']
})
export class ImStatComponent implements OnInit{
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
