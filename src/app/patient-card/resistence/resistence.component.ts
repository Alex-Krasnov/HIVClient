import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resistence',
  templateUrl: './resistence.component.html',
  styleUrls: ['./resistence.component.css']
})
export class ResistenceComponent implements OnInit{
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
