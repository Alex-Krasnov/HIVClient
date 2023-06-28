import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, firstValueFrom } from 'rxjs';
import { PassportModel } from 'src/app/_interfaces/passport.model';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';
import { PassportService } from 'src/app/services/passport.service';
import { PassportForm } from './passport-form.model';
import { PassportOutModel } from 'src/app/_interfaces/passport-out.model';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.css']
})
export class PassportComponent implements OnInit{

  @Input() patientId: number;
  private PasForm: BehaviorSubject<FormGroup | undefined>
  PasForm$: Observable<FormGroup>
  PasFormSub: Subscription;

  pasForm: FormGroup;
  pasport: PassportModel;

  needUpd: boolean = false;
  pervValue: PassportOutModel;

  constructor(
    private service: PassportService,
    private fb: FormBuilder,
    public modal: ModalService,
    private listService: ListService
  ){}

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.service.getData(this.patientId)
    .subscribe((data:PassportModel) => {
      this.pasport = data;
      this.pervValue = {
        patientId: data.patientId,
        region: data.region,
        locationName: data.locationName,
        cityName: data.cityName,
        index: data.index,
        addrStreat: data.addrStreat,
        addrHouse: data.addrHouse,
        addrExt: data.addrExt,
        addrFlat: data.addrFlat,
        regionFact: data.regionFact,
        cityNameFact: data.cityNameFact,
        locationNameFact: data.locationNameFact,
        indexFact: data.indexFact,
        addrStreatFact: data.addrStreatFact,
        addrExtFact: data.addrExtFact,
        addrHouseFact: data.addrHouseFact,
        addrFlatFact: data.addrFlatFact,
        dtRegBeg: data.dtRegBeg == null?  null : data.dtRegBeg.toString(),
        dtRegEnd: data.dtRegEnd == null?  null : data.dtRegEnd.toString(),   
        pasSer: data.pasSer,
        pasNum: data.pasNum,
        pasWhen: data.pasWhen == null?  null : data.pasWhen.toString(),
        pasWhom: data.pasWhom,
        omsSer: data.omsSer,
        omsNum: data.omsNum,
        omsWhen: data.omsWhen == null?  null : data.omsWhen.toString()
      }    
      this.initForm();
    });
  }

  initForm(){
    this.PasForm = new BehaviorSubject(this.fb.group(new PassportForm(this.listService ,this.pasport)));
    this.PasForm$ = this.PasForm.asObservable();

    this.PasFormSub = this.PasForm$
      .subscribe(data => {
        this.pasForm = data;
    });

    this.pasForm.statusChanges.subscribe( (status) => {
      if(status == 'VALID')
        this.needUpd = true;
    })
  }

  async close(){
    if(this.pasForm.valid){
      if(this.needUpd)
        this.updatePassport()
        this.modal.close()
    }
  }

  updatePassport(){
    let curValue: PassportOutModel = {
      patientId: this.pasForm.controls['patientId'].value,
      region: this.pasForm.controls['region'].value,
      locationName: this.pasForm.controls['locationName'].value,
      cityName: this.pasForm.controls['cityName'].value,
      index: this.pasForm.controls['index'].value,
      addrStreat: this.pasForm.controls['addrStreat'].value,
      addrHouse: this.pasForm.controls['addrHouse'].value,
      addrExt: this.pasForm.controls['addrExt'].value,
      addrFlat: this.pasForm.controls['addrFlat'].value,
      regionFact: this.pasForm.controls['regionFact'].value,
      cityNameFact: this.pasForm.controls['cityNameFact'].value,
      locationNameFact: this.pasForm.controls['locationNameFact'].value,
      indexFact: this.pasForm.controls['indexFact'].value,
      addrStreatFact: this.pasForm.controls['addrStreatFact'].value,
      addrExtFact: this.pasForm.controls['addrExtFact'].value,
      addrHouseFact: this.pasForm.controls['addrHouseFact'].value,
      addrFlatFact: this.pasForm.controls['addrFlatFact'].value,
      dtRegBeg: this.pasForm.controls['dtRegBeg'].value,
      dtRegEnd: this.pasForm.controls['dtRegEnd'].value,   
      pasSer: this.pasForm.controls['pasSer'].value,
      pasNum: this.pasForm.controls['pasNum'].value,
      pasWhen: this.pasForm.controls['pasWhen'].value,
      pasWhom: this.pasForm.controls['pasWhom'].value,
      omsSer: this.pasForm.controls['omsSer'].value,
      omsNum: this.pasForm.controls['omsNum'].value,
      omsWhen: this.pasForm.controls['omsWhen'].value
    };
    
    if(!(JSON.stringify(this.pervValue) === JSON.stringify(curValue))){
      // let a = firstValueFrom(this.service.updatePas(curValue)) 
      this.service.updatePas(curValue).subscribe()
    }
  }
}
