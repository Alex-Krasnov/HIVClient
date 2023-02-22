import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { PatientCardMain } from 'src/app/services/patient-card-main.service';
import { Stage } from 'src/app/_interfaces/stage.model';

@Component({
  selector: 'app-patient-stage',
  templateUrl: './patient-stage.component.html',
  styleUrls: ['./patient-stage.component.css']
})
export class PatientStageComponent implements OnInit {
  @Input() stages: FormArray = 
    this.fb.array([
      new FormControl('stageDate'),
      new FormControl('stage')
    ]);
  @Input() patientId: number;

  constructor(
    private fb: FormBuilder,
    private getPatient: PatientCardMain
  ){}

  ngOnInit() {}
 
  delStage(date: Date, index: number) {
    console.log('date - egjdfhjd;khdf', date);
    this.getPatient.delPatientStage(this.patientId, date).subscribe();
    // this.stages.removeAt(index);
  }
}
