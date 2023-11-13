import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, FormArray} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { RegVisitService } from 'src/app/services/reg-visit.service';
import { RegVisit } from 'src/app/_interfaces/reg-visit.model';
import { ShareDataRegVisit } from 'src/app/_interfaces/share-data-reg-visit';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.css']
})
export class SelectDateComponent implements OnInit{
  
  dataList: RegVisit | undefined;
  formR: FormGroup;
  IsActive: Boolean = false ;
  dataCalendar: ShareDataRegVisit;
  calendar = new FormArray([]);
  infStr: string;
  
  @Input() isModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public modal: ModalService,
    private service: RegVisitService
  ){}

  ngOnInit() {
    this.dataCalendar = JSON.parse(localStorage.getItem('calendar'))
    this.infStr = localStorage.getItem('inf_str_reg')
    
    this.dataCalendar.calendars.forEach(data => {
      let dayOfWeek;
      switch (data.dayOfWeek) {
        case 'Monday':
          dayOfWeek = 'Понедельник'
          break;
        case 'Tuesday':
          dayOfWeek = 'Вторник'
          break;
        case 'Wednesday':
          dayOfWeek = 'Среда'
          break;
        case 'Thursday':
          dayOfWeek = 'Четверг'
          break;
        case 'Friday':
          dayOfWeek = 'Пятница'
          break;
        case 'Saturday':
          dayOfWeek = 'Суббота'
          break;
        case 'Sunday':
          dayOfWeek = 'Воскресенье'
          break;
        default:
          break;
      }

      const sForm = new FormGroup ({
        cuontRecord: new FormControl({value: data.cuontRecord, disabled: true}),
        date: new FormControl({value: formatDate(data.date, 'dd-MM-yyyy', 'en-US'), disabled: true}),
        dayOfWeek: new FormControl({value: dayOfWeek, disabled: true}),
        isActive: new FormControl(data.isActive)
      });
      this.calendar.push(sForm);
    })
    this.formR = this.fb.group({
      subs: this.calendar as FormArray
    });
  }
  
  get subs() {
    return this.formR.get('subs') as FormArray;
  }

  async getListTime( index: number){
    let time =  await firstValueFrom(this.service.getUnregTime(this.dataCalendar.patientId, this.dataCalendar.docId, this.dataCalendar.cabId, this.dataCalendar.calendars[index].date.toString()))
    
    localStorage.setItem('time',JSON.stringify(time))
    localStorage.removeItem('inf_str_reg')
    localStorage.setItem('inf_str_reg', this.infStr+'  Дата: '+formatDate(this.dataCalendar.calendars[index].date, 'dd-MM-yyyy', 'en-US'))

    if(!this.isModal){
      this.router.navigate(['sltime'])
      return null
    }

    this.modal.regIsVisible3$.next(true)
    this.modal.regIsVisible2$.next(false)
  }

  goBack(){
    localStorage.removeItem('calendar')
    localStorage.removeItem('time')
    
    if(!this.isModal){
      this.router.navigate(['sldocdabdaterange'])
      return null
    }

    this.modal.regIsVisible1$.next(true)
    this.modal.regIsVisible2$.next(false)
  }

  goHome(){
    localStorage.removeItem('calendar')
    localStorage.removeItem('time')
    localStorage.removeItem('inf_str_reg')
    this.router.navigate(['main'])
  }
}