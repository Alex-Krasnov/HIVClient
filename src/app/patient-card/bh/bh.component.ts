import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bh',
  templateUrl: './bh.component.html',
  styleUrls: ['./bh.component.css']
})
export class BHComponent implements OnInit{
  formS: FormGroup;
  pervValue: any;
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
     return this.formS.get('subs').value;
  }
}
