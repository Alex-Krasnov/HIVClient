import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';
import { ModalService } from 'src/app/services/modal.service';
import { RegVisitService } from 'src/app/services/reg-visit.service';
import { RegVisit } from 'src/app/_interfaces/reg-visit.model';
import { ShareDataRegVisit } from 'src/app/_interfaces/share-data-reg-visit';

@Component({
  selector: 'app-select-doc-cab-date-range',
  templateUrl: './select-doc-cab-date-range.component.html',
  styleUrls: ['./select-doc-cab-date-range.component.css']
})
export class SelectDocCabDateRangeComponent implements OnInit{
  
  dataList: RegVisit | undefined;
  formR: FormGroup;
  IsActive: Boolean = false ;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private listService: ListService,
    public modal: ModalService,
    private service: RegVisitService
  ){}

  ngOnInit() {
    this.service.getData().subscribe((data:RegVisit) => {
      this.dataList = data;
      this.IsActive = true;
      this.initForm();
    });
  }

  initForm(){
    this.formR = this.fb.group({
      patientId: new FormControl(),
      docName: new FormControl('', {
        asyncValidators: [InList.validateDoctor(this.listService)],
        updateOn: 'blur'
      }),
      cabName: new FormControl('', {
        asyncValidators: [InList.validateCabinet(this.listService)],
        updateOn: 'blur'
      }),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });
  }

  async getCalendar(){

    let patientId = this.formR.get('patientId').value
    let docName = this.formR.get('docName').value
    let cabName = this.formR.get('cabName').value
    let startDate = this.formR.get('startDate').value
    let endDate = this.formR.get('endDate').value

    if(this.formR.get('docName').valid && this.formR.get('cabName').valid && patientId != null){
      
      let calendar: ShareDataRegVisit =  await firstValueFrom(this.service.getUnregDate(patientId, docName, cabName, startDate, endDate)) as ShareDataRegVisit
      
      localStorage.setItem('calendar',JSON.stringify(calendar))      
      this.router.navigate(['sldate'])
    }   
  }

  goHome(){
    localStorage.removeItem('calendar')
    this.router.navigate(['main'])
  }
}