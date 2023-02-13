import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Blot } from 'src/app/_interfaces/blot.model';

@Component({
  selector: 'app-patient-blot',
  templateUrl: './patient-blot.component.html',
  styleUrls: ['./patient-blot.component.css']
})
export class PatientBlotComponent implements OnInit {
  @Input() blots: Blot[];
  @Output() delBlotId = new EventEmitter<number>();

  ngOnInit() {
    
 }

 delBlot(blotId: number) {
  this.delBlotId.emit(blotId);
 }
}
