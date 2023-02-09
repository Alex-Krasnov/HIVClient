import { Component, Input, OnInit } from '@angular/core';
import { SecondDeseases } from 'src/app/_interfaces/second-deseases.model';

@Component({
  selector: 'app-patient-second-desease',
  templateUrl: './patient-second-desease.component.html',
  styleUrls: ['./patient-second-desease.component.css']
})
export class PatientSecondDeseaseComponent implements OnInit{
  @Input() secondDeseases: SecondDeseases[];

  ngOnInit() {
    
 }
}
