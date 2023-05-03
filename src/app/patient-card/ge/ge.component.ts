import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ge',
  templateUrl: './ge.component.html',
  styleUrls: ['./ge.component.css']
})
export class GEComponent implements OnInit{
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
