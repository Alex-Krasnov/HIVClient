import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, FormArray} from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { RegVisitService } from 'src/app/services/reg-visit.service';
import { RegVisit } from 'src/app/_interfaces/reg-visit.model';
import { ShareDataRegVisit } from 'src/app/_interfaces/share-data-reg-visit';

@Component({
  selector: 'app-select-time',
  templateUrl: './select-time.component.html',
  styleUrls: ['./select-time.component.css']
})
export class SelectTimeComponent implements OnInit{
  
  dataList: RegVisit | undefined;
  formR: FormGroup;
  IsActive: Boolean = false ;
  dataTime: ShareDataRegVisit;
  time = new FormArray([]);
  infStr: string;
  
  @Input() isModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public modal: ModalService,
    private service: RegVisitService
  ){}

  ngOnInit() {
    this.dataTime = JSON.parse(localStorage.getItem('time'))
    this.infStr = localStorage.getItem('inf_str_reg')

    this.dataTime.regTimes.forEach(data => {
      const sForm = new FormGroup ({
        cuontRecord: new FormControl({value: data.cuontRecord, disabled: true}),
        timeName: new FormControl({value: data.timeName, disabled: true})
      });
      this.time.push(sForm);
    })

    this.formR = this.fb.group({
      subs: this.time as FormArray
    });
  }
  
  get subs() {
    return this.formR.get('subs') as FormArray;
  }

  setVisit( index: number){
    this.service.setVisit(this.dataTime.patientId, this.dataTime.docId, this.dataTime.cabId, this.dataTime.date, this.dataTime.regTimes[index].timeName).subscribe()
    localStorage.removeItem('time')
    localStorage.removeItem('inf_str_reg')

    if(!this.isModal){
      this.router.navigate(['main'])
      return null
    }
    
    this.modal.close()
  }

  goBack(){
    localStorage.removeItem('time')
    
    if(!this.isModal){
      this.router.navigate(['sldate'])
      return null
    }

    this.modal.regIsVisible2$.next(true)
    this.modal.regIsVisible3$.next(false)
  }

  goHome(){
    localStorage.removeItem('time')
    localStorage.removeItem('inf_str_reg')
    this.router.navigate(['main'])
  }
}