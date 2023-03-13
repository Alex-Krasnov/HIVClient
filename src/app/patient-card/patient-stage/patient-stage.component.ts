import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PatientCardMainService } from 'src/app/services/patient-card-main.service';

@Component({
  selector: 'app-patient-stage',
  templateUrl: './patient-stage.component.html',
  styleUrls: ['./patient-stage.component.css']
})
export class PatientStageComponent implements OnInit {
  formS: FormGroup;
  pervValue: any;
  @Input() stageArr: FormArray; 
  @Input() patientId: number;
  @Output() sForUpd = new EventEmitter<object[]>();

  constructor(
    private fb: FormBuilder,
    private patientService: PatientCardMainService
  ){}

  ngOnInit() {
    this.formS = this.fb.group({
      stages: this.stageArr as FormArray,
      newStageDate: new FormControl(),
      newStage: new FormControl()
    });
    this.pervValue = this.stageArr.value as FormArray;
  }

  get stages() {
    return this.formS.get('stages') as FormArray;
  }
 
  delStage(index: number) {
    let e = this.stages.at(index);
    this.patientService.delPatientStage(this.patientId, e.get('stageDate').value).subscribe();
    this.stages.removeAt(index);
  }

  createStage(){
    let StageDate = this.formS.get('newStageDate').value
    let Stage = this.formS.get('newStage').value

    const stageForm = new FormGroup ({
      stageDate: new FormControl(StageDate),
      stage: new FormControl(Stage)
    });

    this.patientService.createPatientStage(this.patientId, StageDate, Stage)
    .subscribe()

    this.stages.push(stageForm)

    this.formS.get('newStageDate').setValue('')
    this.formS.get('newStage').setValue('')
    this.formS.get('newStageDate').markAsPristine()
    this.formS.get('newStage').markAsPristine()
  }

  ngOnDestroy() {
    let oldValue = this.pervValue;
    let curValue = this.formS.controls['stages'].value;

    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue))){
      var forUpd = [];

      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          forUpd.push({
            patientId: this.patientId,
            StageDate: curValue[index].stageDate, 
            StageName: curValue[index].stage,
            StageDateOld: oldValue[index].stageDate
          });
        }
      } 
      
      this.sForUpd.emit(forUpd);
    }
  }
}
