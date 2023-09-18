import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, FormArray} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { RegVisitService } from 'src/app/services/reg-visit.service';
import { RegVisit } from 'src/app/_interfaces/reg-visit.model';
import { ShareDataRegVisit } from 'src/app/_interfaces/share-data-reg-visit';
import { formatDate } from '@angular/common';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public modal: ModalService,
    private service: RegVisitService
  ){}

  ngOnInit() {
    this.dataTime = JSON.parse(localStorage.getItem('time'))

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
    this.router.navigate(['main'])
  }

  goHome(){
    localStorage.removeItem('time')
    this.router.navigate(['main'])
  }
}