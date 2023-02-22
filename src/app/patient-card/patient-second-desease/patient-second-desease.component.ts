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

  // form: FormGroup;

  // farray = new FormArray([]); 
  @Input() chForm: FormArray; 
  @Input() patientId: number;

  constructor(
    private getPatient: PatientCardMain,
    private fb: FormBuilder
  ){}

  ngOnInit() { 
    
  }
  get secondDeseases() {
    return this.chForm.get("secondDeseases") as FormArray;
  }

  // initForm(){
  //   this.form = new FormGroup({
  //     secondDeseases: this.fb.array([
  //       this.fb.group({
  //         startDate: new FormControl(),
  //         endDate: new FormControl(),
  //         deseas: new FormControl('123')
  //       })
  //     ])
  //   });
  // }

  delSecondDeseases(date: Date, name: string, index: number) {
    console.log(this.chForm);
    console.log('date - ', date,'name - ', name, index);
    // this.getPatient.delPatientSecondDesease(this.patientId, date, name).subscribe(); 
    // this.secondDeseases.removeAt(index);
    // location.reload();
  }
}