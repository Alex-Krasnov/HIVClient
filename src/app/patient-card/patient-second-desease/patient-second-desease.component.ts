import { Component, Input, OnInit } from '@angular/core';
import { PatientCardMain } from 'src/app/services/patient-card-main.service';
import { SecondDeseases } from 'src/app/_interfaces/second-deseases.model';

@Component({
  selector: 'app-patient-second-desease',
  templateUrl: './patient-second-desease.component.html',
  styleUrls: ['./patient-second-desease.component.css']
})
export class PatientSecondDeseaseComponent implements OnInit{
  @Input() secondDeseases: SecondDeseases[];
  @Input() patientId: number;

  constructor(
    private getPatient: PatientCardMain
  ){}

  ngOnInit() {}

  delSecondDeseases(date: Date, name: string) {
    console.log('date - ', date,'name - ', name);
    this.getPatient.delPatientSecondDesease(this.patientId, date, name)
    .subscribe();
    location.reload();
  }
}