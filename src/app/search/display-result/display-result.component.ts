import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Search } from 'src/app/_interfaces/search.model';
import { ModalPatientCardService } from 'src/app/services/patient-card/modal-patient-card.service';
import { SearchSharedServiceService } from 'src/app/services/search/search-shared-service.service';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.css']
})
export class DisplayResultComponent implements OnInit, OnChanges{
  @Input() data: Search;
  dataForm: FormGroup;
  arr = new FormArray([]);
  colName: string[] = [];

  constructor(
    private fb: FormBuilder,
    public shared: SearchSharedServiceService,
    public modal: ModalPatientCardService
  ){}

  ngOnInit() {
    this.modal.isVisible$.subscribe((isVisible) => {
      if (isVisible) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    });
    this.initForm()
  }

  initForm(){
    for(var key in this.data.resPage[0]){
      this.colName.push(key)
    }

    this.data.resPage.forEach((item: Object) =>{
      let fgItem = new FormGroup({})
      for (var key in item) {
        fgItem.addControl(key, new FormControl({value: item[key], disabled: true}))
      }
      this.arr.push(fgItem)
    })
    
    this.dataForm = this.fb.group({
      rows: this.arr as FormArray
    });
  }

  get rows(){
    return this.dataForm.get('rows') as FormArray;
  }

  formGroup(i) {
    return this.arr.at(i) as FormGroup;
  }

  openPatient(i: number){
    this.modal.open()
    this.modal.currentPage.next('main')
    this.modal.patientId.next(this.formGroup(i).get('patient_id').value)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && !changes.data.firstChange) {
      this.colName = []
      this.arr = new FormArray([])
      this.initForm()
    }
  }
}
