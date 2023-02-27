import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PatientCardMain } from 'src/app/services/patient-card-main.service';
import { SecondDeseases } from 'src/app/_interfaces/second-deseases.model';

@Component({
  selector: 'app-patient-second-desease',
  templateUrl: './patient-second-desease.component.html',
  styleUrls: ['./patient-second-desease.component.css']
})
export class PatientSecondDeseaseComponent implements OnInit{
  form: FormGroup;
  @Input() deseasArr: FormArray; 
  @Input() patientId: number;

  constructor(
    private patientService: PatientCardMain,
    private fb: FormBuilder
  ){}

  ngOnInit() { 
    this.form = this.fb.group({
      secondDeseases: this.deseasArr as FormArray,
      newStartDate: new FormControl(),
      newEndDate: new FormControl(),
      newDeseas: new FormControl()
    })
  }

  get secondDeseases() {
    return this.form.get('secondDeseases') as FormArray;
  }

  delSecondDeseases(index: number) {
    let e = this.secondDeseases.at(index)
    console.log(e.get('startDate').value, e.get('deseas').value);
    this.patientService.delPatientSecondDesease(this.patientId, e.get('startDate').value, e.get('deseas').value).subscribe(); 
    this.secondDeseases.removeAt(index);
  }

  createSecondDeseases(){
    let StartDate = this.form.get('newStartDate').value;
    let EndDate = this.form.get('newEndDate').value;
    let Deseas = this.form.get('newDeseas').value

    const desForm = new FormGroup ({
      startDate: new FormControl(StartDate),
      endDate: new FormControl(EndDate),
      deseas: new FormControl(Deseas)
    });

    this.patientService.createPatientSecondDesease(this.patientId, StartDate, EndDate, Deseas)
    .subscribe()

    this.secondDeseases.push(desForm);

    this.form.get('newStartDate').setValue('')
    this.form.get('newEndDate').setValue('')
    this.form.get('newDeseas').setValue('')
  }
}