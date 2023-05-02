import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-im-stat-cd348',
  templateUrl: './im-stat-cd348.component.html',
  styleUrls: ['./im-stat-cd348.component.css']
})
export class ImStatCD348Component implements OnInit{
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
