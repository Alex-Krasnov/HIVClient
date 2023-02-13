import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientCardMainModel } from 'src/app/_interfaces/patient-card-main.model';
import { PatientCardMain } from 'src/app/services/patient-card-main.service';
import { NgForm } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-patient-card-main',
  templateUrl: './patient-card-main.component.html',
  styleUrls: ['./patient-card-main.component.css']
})
export class PatientCardMainComponent implements OnInit {
  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu:boolean = false;
  patientId: number;

  patient: PatientCardMainModel | undefined;

  constructor(
    private route: ActivatedRoute,
    private getPatient: PatientCardMain
  ){}

  ngOnInit() {
     this.getPatientData();
  }

  openDropdown(str:string): void{
    switch(str){
      case "Диагностика":
        this.isVisibleDiagn = !this.isVisibleDiagn;
        console.log('patient' ,this.patient);
        break;
      case "Системные":
        this.isVisibleSystem = !this.isVisibleSystem;
        break;
      case "Меню":
        this.isVisibleMenu = !this.isVisibleMenu;
        break;
    } 
  }

  getPatientData(): void {
    this.route.params.subscribe(params => {
      this.patientId = params['id']
    });
    this.getPatient.getPatientData(this.patientId)
      .subscribe((data:PatientCardMainModel) => this.patient = data);
  }

  delBlot(blotId: number) {
    console.log('blotId - ', blotId);
    this.getPatient.delPatientBlot(this.patientId, blotId)
    .subscribe();
    location.reload();
  }

  delStage(date: Date) {
    console.log('date - ', date);
    this.getPatient.delPatientStage(this.patientId, date)
    .subscribe();
    location.reload();
  }
}
