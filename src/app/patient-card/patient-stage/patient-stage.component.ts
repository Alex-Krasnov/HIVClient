import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stage } from 'src/app/_interfaces/stage.model';

@Component({
  selector: 'app-patient-stage',
  templateUrl: './patient-stage.component.html',
  styleUrls: ['./patient-stage.component.css']
})
export class PatientStageComponent implements OnInit {
  @Input() stages: Stage[];
  @Output() delStageId = new EventEmitter<Date>();

  ngOnInit() {}
 
  delStage(date: Date) {
    this.delStageId.emit(date);
  }
}
