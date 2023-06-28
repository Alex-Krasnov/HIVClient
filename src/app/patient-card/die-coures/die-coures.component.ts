import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Course } from 'src/app/_interfaces/course.model';
import { DieCourseAdvancedModel } from 'src/app/_interfaces/die-course-advanced.model';
import { DieCourseService } from 'src/app/services/die-course.service';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';
import { DieCourseForm } from './die-course-form.model';

@Component({
  selector: 'app-die-coures',
  templateUrl: './die-coures.component.html',
  styleUrls: ['./die-coures.component.css']
})
export class DieCouresComponent implements OnInit{

  @Input() patientId: number;
  @Input() listDieCourse: Course[];
  private DieForm: BehaviorSubject<FormGroup | undefined>
  DieForm$: Observable<FormGroup>
  DieFormSub: Subscription;

  dieForm: FormGroup;
  die: DieCourseAdvancedModel;

  needUpd: boolean = false;
  pervValue: DieCourseAdvancedModel;

  dieShort: string;
  dieLong: string;

  constructor(
    private service: DieCourseService,
    private fb: FormBuilder,
    public modal: ModalService,
    private listService: ListService
  ){}

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.service.getData(this.patientId)
    .subscribe((data:DieCourseAdvancedModel) => {
      this.die = data;
      this.pervValue = {
        patientId: data.patientId,
        dieCourseShort1: data.dieCourseShort1,
        dieCourseShort2: data.dieCourseShort2,
        dieCourseShort3: data.dieCourseShort3,
        dieCourseShort4: data.dieCourseShort4,
        dieCourseShort5: data.dieCourseShort5,
        dieCourseLong1: data.dieCourseLong1,
        dieCourseLong2: data.dieCourseLong2,
        dieCourseLong3: data.dieCourseLong3,
        dieCourseLong4: data.dieCourseLong4,
        dieCourseLong5: data.dieCourseLong5,
      }    
      this.initForm();
    });
  }

  initForm(){
    this.DieForm = new BehaviorSubject(this.fb.group(new DieCourseForm(this.listService ,this.die)));
    this.DieForm$ = this.DieForm.asObservable();

    this.DieFormSub = this.DieForm$
      .subscribe(data => {
        this.dieForm = data;
    });

    this.dieForm.statusChanges.subscribe( (status) => {
      if(status == 'VALID')
        this.needUpd = true;
    })

    this.syncLongNShort()

    this.dieForm.controls['dieCourseShort1'].valueChanges.subscribe(item => this.dieShort = item)
    this.dieForm.controls['dieCourseShort2'].valueChanges.subscribe(item => this.dieShort = item)
    this.dieForm.controls['dieCourseShort3'].valueChanges.subscribe(item => this.dieShort = item)
    this.dieForm.controls['dieCourseShort4'].valueChanges.subscribe(item => this.dieShort = item)
    this.dieForm.controls['dieCourseShort5'].valueChanges.subscribe(item => this.dieShort = item)

    this.dieForm.controls['dieCourseLong1'].valueChanges.subscribe(item => this.dieLong = item)
    this.dieForm.controls['dieCourseLong2'].valueChanges.subscribe(item => this.dieLong = item)
    this.dieForm.controls['dieCourseLong3'].valueChanges.subscribe(item => this.dieLong = item)
    this.dieForm.controls['dieCourseLong4'].valueChanges.subscribe(item => this.dieLong = item)
    this.dieForm.controls['dieCourseLong5'].valueChanges.subscribe(item => this.dieLong = item)
  }

  async close(){
    if(this.dieForm.valid){
      if(this.needUpd)
        this.update()
        this.modal.close()
    }
  }

  update(){
    let curValue: DieCourseAdvancedModel = {
      patientId: this.dieForm.controls['patientId'].value,
      dieCourseShort1: this.dieForm.controls['dieCourseShort1'].value,
      dieCourseShort2: this.dieForm.controls['dieCourseShort2'].value,
      dieCourseShort3: this.dieForm.controls['dieCourseShort3'].value,
      dieCourseShort4: this.dieForm.controls['dieCourseShort4'].value,
      dieCourseShort5: this.dieForm.controls['dieCourseShort5'].value
    };
    
    if(!(JSON.stringify(this.pervValue) === JSON.stringify(curValue))){
      this.service.updateDie(curValue).subscribe()
    }
  }

  syncLongNShort(){
    
    this.dieForm.controls['dieCourseShort1'].statusChanges.subscribe((status) => {
      let index = this.listDieCourse.findIndex(e => e.short == this.dieForm.controls['dieCourseShort1'].value)
      if(index == this.listDieCourse.findIndex(e => e.long == this.dieForm.controls['dieCourseLong1'].value) || status != 'VALID')
        return null
        
      if(this.dieForm.controls['dieCourseShort1'].value == null || this.dieForm.controls['dieCourseShort1'].value.length == 0){
        this.dieForm.controls['dieCourseLong1'].setValue('')
        return null
      }

      this.dieForm.controls['dieCourseLong1'].setValue( this.listDieCourse.at(index).long)
    })

    this.dieForm.controls['dieCourseShort2'].statusChanges.subscribe((status) => {
      let index = this.listDieCourse.findIndex(e => e.short == this.dieForm.controls['dieCourseShort2'].value)
      if(index == this.listDieCourse.findIndex(e => e.long == this.dieForm.controls['dieCourseLong2'].value) || status != 'VALID')
        return null
        
      if(this.dieForm.controls['dieCourseShort2'].value == null || this.dieForm.controls['dieCourseShort2'].value.length == 0){
        this.dieForm.controls['dieCourseLong2'].setValue('')
        return null
      }

      this.dieForm.controls['dieCourseLong2'].setValue( this.listDieCourse.at(index).long)
    })

    this.dieForm.controls['dieCourseShort3'].statusChanges.subscribe((status) => {
      let index = this.listDieCourse.findIndex(e => e.short == this.dieForm.controls['dieCourseShort3'].value)
      if(index == this.listDieCourse.findIndex(e => e.long == this.dieForm.controls['dieCourseLong3'].value) || status != 'VALID')
        return null
        
      if(this.dieForm.controls['dieCourseShort3'].value == null || this.dieForm.controls['dieCourseShort3'].value.length == 0){
        this.dieForm.controls['dieCourseLong3'].setValue('')
        return null
      }

      this.dieForm.controls['dieCourseLong3'].setValue( this.listDieCourse.at(index).long)
    })

    this.dieForm.controls['dieCourseShort4'].statusChanges.subscribe((status) => {
      let index = this.listDieCourse.findIndex(e => e.short == this.dieForm.controls['dieCourseShort4'].value)
      if(index == this.listDieCourse.findIndex(e => e.long == this.dieForm.controls['dieCourseLong4'].value) || status != 'VALID')
        return null
        
      if(this.dieForm.controls['dieCourseShort4'].value == null || this.dieForm.controls['dieCourseShort4'].value.length == 0){
        this.dieForm.controls['dieCourseLong4'].setValue('')
        return null
      }

      this.dieForm.controls['dieCourseLong4'].setValue( this.listDieCourse.at(index).long)
    })

    this.dieForm.controls['dieCourseShort5'].statusChanges.subscribe((status) => {
      let index = this.listDieCourse.findIndex(e => e.short == this.dieForm.controls['dieCourseShort5'].value)
      if(index == this.listDieCourse.findIndex(e => e.long == this.dieForm.controls['dieCourseLong5'].value) || status != 'VALID')
        return null
        
      if(this.dieForm.controls['dieCourseShort5'].value == null || this.dieForm.controls['dieCourseShort5'].value.length == 0){
        this.dieForm.controls['dieCourseLong5'].setValue('')
        return null
      }

      this.dieForm.controls['dieCourseLong5'].setValue( this.listDieCourse.at(index).long)
    })



    this.dieForm.controls['dieCourseLong1'].statusChanges.subscribe((status) => {
      let index = this.listDieCourse.findIndex(e => e.long == this.dieForm.controls['dieCourseLong1'].value)
      
      if(index == this.listDieCourse.findIndex(e => e.short == this.dieForm.controls['dieCourseShort1'].value) || status != 'VALID')
        return null
      
      if(this.dieForm.controls['dieCourseLong1'].value == null || this.dieForm.controls['dieCourseLong1'].value.length == 0){
        this.dieForm.controls['dieCourseShort1'].setValue('')
        return null
      }
      
      this.dieForm.controls['dieCourseShort1'].setValue( this.listDieCourse.at(index).short)
    })

    this.dieForm.controls['dieCourseLong2'].statusChanges.subscribe((status) => {
      let index = this.listDieCourse.findIndex(e => e.long == this.dieForm.controls['dieCourseLong2'].value)
      
      if(index == this.listDieCourse.findIndex(e => e.short == this.dieForm.controls['dieCourseShort2'].value) || status != 'VALID')
        return null
      
      if(this.dieForm.controls['dieCourseLong2'].value == null || this.dieForm.controls['dieCourseLong2'].value.length == 0){
        this.dieForm.controls['dieCourseShort2'].setValue('')
        return null
      }
      
      this.dieForm.controls['dieCourseShort2'].setValue( this.listDieCourse.at(index).short)
    })

    this.dieForm.controls['dieCourseLong3'].statusChanges.subscribe((status) => {
      let index = this.listDieCourse.findIndex(e => e.long == this.dieForm.controls['dieCourseLong3'].value)
      
      if(index == this.listDieCourse.findIndex(e => e.short == this.dieForm.controls['dieCourseShort3'].value) || status != 'VALID')
        return null
      
      if(this.dieForm.controls['dieCourseLong3'].value == null || this.dieForm.controls['dieCourseLong3'].value.length == 0){
        this.dieForm.controls['dieCourseShort3'].setValue('')
        return null
      }
      
      this.dieForm.controls['dieCourseShort3'].setValue( this.listDieCourse.at(index).short)
    })

    this.dieForm.controls['dieCourseLong4'].statusChanges.subscribe((status) => {
      let index = this.listDieCourse.findIndex(e => e.long == this.dieForm.controls['dieCourseLong4'].value)
      
      if(index == this.listDieCourse.findIndex(e => e.short == this.dieForm.controls['dieCourseShort4'].value) || status != 'VALID')
        return null
      
      if(this.dieForm.controls['dieCourseLong4'].value == null || this.dieForm.controls['dieCourseLong4'].value.length == 0){
        this.dieForm.controls['dieCourseShort4'].setValue('')
        return null
      }
      
      this.dieForm.controls['dieCourseShort4'].setValue( this.listDieCourse.at(index).short)
    })

    this.dieForm.controls['dieCourseLong5'].statusChanges.subscribe((status) => {
      let index = this.listDieCourse.findIndex(e => e.long == this.dieForm.controls['dieCourseLong5'].value)
      
      if(index == this.listDieCourse.findIndex(e => e.short == this.dieForm.controls['dieCourseShort5'].value) || status != 'VALID')
        return null
      
      if(this.dieForm.controls['dieCourseLong5'].value == null || this.dieForm.controls['dieCourseLong5'].value.length == 0){
        this.dieForm.controls['dieCourseShort5'].setValue('')
        return null
      }
      
      this.dieForm.controls['dieCourseShort5'].setValue( this.listDieCourse.at(index).short)
    })
  }
}