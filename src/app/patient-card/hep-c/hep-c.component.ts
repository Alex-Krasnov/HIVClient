import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first, firstValueFrom } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { PatientCardTreatmentService } from 'src/app/services/patient-card/patient-card-treatment.service';
import { InList } from 'src/app/validators/in-lst';

@Component({
  selector: 'app-hep-c',
  templateUrl: './hep-c.component.html',
  styleUrls: ['./hep-c.component.css']
})
export class HepCComponent  implements OnInit{
  formHepC: FormGroup;
  pervValue: any;
  @Input() hepCArr: FormArray; 
  @Input() patientId: number;
  @Output() hepCIsValid = new EventEmitter<boolean>();

  constructor(
    private patientService: PatientCardTreatmentService,
    private fb: FormBuilder,
    private listService: ListService
  ){}

  ngOnInit() {
    this.hepCIsValid.emit(true);
    this.formHepC = this.fb.group({
      hepCs: this.hepCArr as FormArray, 
      dateStart: new FormControl(null, {updateOn: 'blur'}),
      dateEnd: new FormControl(null, {updateOn: 'blur'}),
      descr: new FormControl(null, {updateOn: 'blur'}),
      dateCreate: new FormControl({value: null, disabled: true})
    }, {updateOn: 'blur'});
    this.pervValue = this.hepCArr.value as FormArray;
    
    this.formHepC.controls['hepCs'].statusChanges.subscribe(() => {
      if (this.formHepC.controls['hepCs'].valid){
        this.update();
        this.hepCIsValid.emit(true);
      } else 
        this.hepCIsValid.emit(false);
    })
  }

  get hepCs() {
    return this.formHepC.get('hepCs') as FormArray;
  }

  del(index: number) {
    let e = this.hepCs.at(index);
    this.patientService.delHepC(e.get('id').value).subscribe();
    this.pervValue.splice(index, 1);
    this.hepCs.removeAt(index);
  }

  async create() {
    let dateStart = this.formHepC.get('dateStart').value
    let dateEnd = this.formHepC.get('dateEnd').value
    let descr = this.formHepC.get('descr').value

    let id = await firstValueFrom(this.patientService.createHepC(this.patientId, dateStart, dateEnd, descr))

    const sForm = new FormGroup ({
      id: new FormControl(id, {updateOn: 'blur'}),
      dateStart: new FormControl(dateStart, {updateOn: 'blur'}),
      dateEnd: new FormControl(dateEnd, {updateOn: 'blur'}),
      descr: new FormControl(descr, {updateOn: 'blur'}),
      dateCreate: new FormControl({value: Date.now(), disabled: true})
    });

    const sData ={
      id: id,
      dateStart: dateStart,
      dateEnd: dateEnd,
      descr: descr,
      dateCreate: Date.now()
    }
    
    this.hepCs.push(sForm)
    this.pervValue.push(sData)
    this.hepCIsValid.emit(true);
    
    this.formHepC.get('dateStart').setValue('')
    this.formHepC.get('dateStart').markAsPristine()
    this.formHepC.get('dateEnd').setValue('')
    this.formHepC.get('dateEnd').markAsPristine()
    this.formHepC.get('descr').setValue('')
    this.formHepC.get('descr').markAsPristine()
  }

  update(){
    let oldValue = this.pervValue;
    let curValue = this.formHepC.controls['hepCs'].value;
    
    if(!(JSON.stringify(oldValue) === JSON.stringify(curValue)))
      for (let index = 0; index < oldValue.length; index++) {
        if(!(JSON.stringify(oldValue[index]) === JSON.stringify(curValue[index]))){          
          this.patientService.updateHepC
          (
            curValue[index].id,
            this.patientId, 
            curValue[index].dateStart, 
            curValue[index].dateEnd, 
            curValue[index].descr
          ).subscribe()
          oldValue[index] = curValue[index]
        }
      } 
  }
}