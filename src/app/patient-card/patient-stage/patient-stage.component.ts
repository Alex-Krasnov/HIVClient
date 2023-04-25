import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { PatientCardMainService } from 'src/app/services/patient-card-main.service';
import { InList } from 'src/app/validators/in-lst';

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
  // @Output() sForUpd = new EventEmitter<object[]>();
  @Output() sIsValid = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private patientService: PatientCardMainService,
    private listService: ListService
  ){}

  ngOnInit() {
    this.sIsValid.emit(true);
    this.formS = this.fb.group({
      stages: this.stageArr as FormArray,
      newStageDate: new FormControl(),
      newStage: new FormControl('', {
        asyncValidators: [InList.validateStage(this.listService)],
        updateOn: 'blur'
      })
    }, {updateOn: 'blur'});
    this.pervValue = this.stageArr.value as FormArray;

    this.formS.controls['stages'].statusChanges.subscribe(() => {
      if (this.formS.controls['stages'].valid){
        this.updateStage();
        this.sIsValid.emit(true);
      } else 
        this.sIsValid.emit(false);
    })
  }

  get stages() {
    return this.formS.get('stages') as FormArray;
  }
 
  delStage(index: number) {
    let e = this.stages.at(index);
    this.patientService.delPatientStage(this.patientId, e.get('stageDate').value).subscribe();
    this.pervValue.splice(index, 1);
    this.stages.removeAt(index);
  }

  createStage(){
    let StageDate = this.formS.get('newStageDate').value
    let Stage = this.formS.get('newStage').value

    if(this.formS.controls['newStage'].valid){
      const stageForm = new FormGroup ({
        stageDate: new FormControl(StageDate),
        stage: new FormControl(Stage, {
          asyncValidators: [InList.validateStage(this.listService)],
          updateOn: 'blur'
        })
      });
  
      const stageData = {
        stageDate: StageDate,
        stage: Stage
      }
  
      this.patientService.createPatientStage(this.patientId, StageDate, Stage)
      .subscribe()
  
      this.stages.push(stageForm)
      this.pervValue.push(stageData)
      this.sIsValid.emit(true);
    }

    this.formS.get('newStageDate').setValue('')
    this.formS.get('newStage').setValue('')
    this.formS.get('newStageDate').markAsPristine()
    this.formS.get('newStage').markAsPristine()
  }

  updateStage(){
    let oldValue = this.pervValue;
    let curValue = this.formS.controls['stages'].value;

    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){
          this.patientService.updatePatientStage(
            this.patientId,
            curValue[index].stageDate, 
            oldValue[index].stageDate,
            curValue[index].stage
          ).subscribe()
          oldValue[index] = curValue[index]
        }
      }
  }

  ngOnDestroy() {}
}
