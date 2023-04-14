import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientCardMainModel } from 'src/app/_interfaces/patient-card-main.model';
import { PatientCardMainService } from 'src/app/services/patient-card-main.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PatientCardMainForm } from './patient-card-main-form.model';
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';
import { pcMain } from 'src/app/_interfaces/pc-main.model';

@Component({
  selector: 'app-patient-card-main',
  templateUrl: './patient-card-main.component.html',
  styleUrls: ['./patient-card-main.component.css']
})
export class PatientCardMainComponent implements OnInit {
  private PatineCardMainForm: BehaviorSubject<FormGroup | undefined>
  PatineCardMainForm$: Observable<FormGroup>

  isVisibleSystem: boolean = false;
  isVisibleDiagn: boolean = false;
  isVisibleMenu:boolean = false;
  bIsValid: boolean = true;
  sdIsValid: boolean = true;
  stageIsValid: boolean = true;
  IsErr: boolean = false;
  needUpd: boolean = false;

  Id: number;
  patient: PatientCardMainModel | undefined;
  patientForm: FormGroup;
  patientFormSub: Subscription;
  patientSecondDeseases = new FormArray([]);
  patientStages = new FormArray([]);
  patientBlot = new FormArray([]);
  pervValue: pcMain;


  constructor(
    private route: ActivatedRoute,
    private patientService: PatientCardMainService,
    private fb: FormBuilder,
    private router: Router,
    private listService: ListService
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => { this.Id = params['id'] })
    this.getPatientData()
  }

  openDropdown(str:string): void{
    switch(str){
      case "Диагностика":
        this.isVisibleDiagn = !this.isVisibleDiagn;
        break;
      case "Системные":
        this.isVisibleSystem = !this.isVisibleSystem;
        break;
      case "Меню":
        this.isVisibleMenu = !this.isVisibleMenu;
        break;
    } 
  }

  getPatientData(): void {
    this.patientService.getPatientData(this.Id)
      .subscribe((data:PatientCardMainModel) => {
        this.patient = data;
        this.initForm();
        this.pervValue = {
          patientId: data.patientId,
          familyName: data.familyName,
          firstName: data.firstName,
          thirdName: data.thirdName,
          sexId: data.sex,
          birthDate: data.birthDate == null?  null : data.birthDate.toString(),
          regOnDate: data.regOnDate == null?  null : data.regOnDate.toString(),
          regOffDate: data.regOffDate == null?  null : data.regOffDate.toString(),
          regOffReason: data.regOffReason,
          unrzFr1: data.unrzFr,

          regionId: data.region,
          cityName: data.cityName,
          locationName: data.locationName,
          addrIndPhone: data.phone,
          addrStreet: data.addrStreat,
          addrHouse: data.addrHouse,
          addrExt: data.addrExt,
          addrFlat: data.addrFlat,

          factRegionId: data.regionFact,
          factCityName: data.cityNameFact,
          factLocationName: data.locationNameFact,
          factAddrInd: data.indexFact,
          factAddrStreet: data.addrStreatFact,
          factAddrHouse: data.addrHouseFact,
          factAddrExt: data.addrExtFact,
          factAddrFlat: data.addrFlatFact,
          dtRegBeg: data.dtRegBeg == null?  null : data.dtRegBeg.toString(),
          dtRegEnd: data.dtRefEnd == null?  null : data.dtRefEnd.toString(),

          addrNameComm: data.comm,
          countryId: data.country,

          placeCheckId: data.placeCheck,
          codeMkb10Id: data.codeMKB10,
          cardNo: data.cardNo,
          vulnerableGroupId: data.vulnerableGroup,
          heightOld: data.heightOld,
          weightOld: data.weightOld,
          flgZamMedPart: data.zamMedPart,
          flgHeadPhysician: data.headPhysician,

          checkCourseId: data.checkCourseShort,
          infectCourseId: data.infectCourseShort,
          dieCourseId: data.dieCourseShort,

          transfAreaDate: data.transfAreaDate == null?  null : data.transfAreaDate.toString(),
          transfFederDate: data.transfFederDate == null?  null : data.transfFederDate.toString(),
          ufsinDate: data.ufsinDate == null?  null : data.ufsinDate.toString(),
          dieDate: data.dieDate == null?  null : data.dieDate.toString(),
          dieAidsDate: data.dieAidsDate == null?  null : data.dieAidsDate.toString(),
          arvtId: data.arvt,
          invalidId: data.invalid,
          snilsFedArchive: data.archive,
          codeword: data.codeWord,
          snils: data.snils,
          fioChange: data.fioChange
        };
      });
  }

  deletePatient(){
    if(confirm(`Вы уверены, что хотите удалить карту пациента?`)){
      this.patientService.delPatientPatient(this.Id).subscribe()
      this.router.navigate(["main"])
    }
  }

  updatePatient(){
    let curValue: pcMain = {
      patientId: this.patientForm.controls['patientId'].value,
      familyName: this.patientForm.controls['familyName'].value,
      firstName: this.patientForm.controls['firstName'].value,
      thirdName: this.patientForm.controls['thirdName'].value,
      sexId: this.patientForm.controls['sex'].value,
      birthDate: this.patientForm.controls['birthDate'].value,
      regOnDate: this.patientForm.controls['regOnDate'].value,
      regOffDate: this.patientForm.controls['regOffDate'].value,
      regOffReason: this.patientForm.controls['regOffReason'].value,
      unrzFr1: this.patientForm.controls['unrzFr'].value,
      regionId: this.patientForm.controls['region'].value,
      cityName: this.patientForm.controls['cityName'].value,
      locationName: this.patientForm.controls['locationName'].value,
      addrIndPhone: this.patientForm.controls['phone'].value,
      addrStreet: this.patientForm.controls['addrStreat'].value,
      addrHouse: this.patientForm.controls['addrHouse'].value,
      addrExt: this.patientForm.controls['addrExt'].value,
      addrFlat: this.patientForm.controls['addrFlat'].value,
      factRegionId: this.patientForm.controls['regionFact'].value,
      factCityName: this.patientForm.controls['cityNameFact'].value,
      factLocationName: this.patientForm.controls['locationNameFact'].value,
      factAddrInd: this.patientForm.controls['indexFact'].value,
      factAddrStreet: this.patientForm.controls['addrStreatFact'].value,
      factAddrHouse: this.patientForm.controls['addrHouseFact'].value,
      factAddrExt: this.patientForm.controls['addrExtFact'].value,
      factAddrFlat: this.patientForm.controls['addrFlatFact'].value,
      dtRegBeg: this.patientForm.controls['dtRegBeg'].value,
      dtRegEnd: this.patientForm.controls['dtRefEnd'].value,
      addrNameComm: this.patientForm.controls['comm'].value,
      countryId: this.patientForm.controls['country'].value,
      placeCheckId: this.patientForm.controls['placeCheck'].value,
      codeMkb10Id: this.patientForm.controls['codeMKB10'].value,
      cardNo: this.patientForm.controls['cardNo'].value,
      vulnerableGroupId: this.patientForm.controls['vulnerableGroup'].value,
      heightOld: this.patientForm.controls['heightOld'].value == ''? null:this.patientForm.controls['heightOld'].value,
      weightOld: this.patientForm.controls['weightOld'].value == ''? null:this.patientForm.controls['weightOld'].value,
      flgZamMedPart: this.patientForm.controls['zamMedPart'].value,
      flgHeadPhysician: this.patientForm.controls['headPhysician'].value,
      checkCourseId: this.patientForm.controls['checkCourseShort'].value,
      infectCourseId: this.patientForm.controls['infectCourseShort'].value,
      dieCourseId: this.patientForm.controls['dieCourseShort'].value,
      transfAreaDate: this.patientForm.controls['transfAreaDate'].value,
      transfFederDate: this.patientForm.controls['transfFederDate'].value,
      ufsinDate: this.patientForm.controls['ufsinDate'].value,
      dieDate: this.patientForm.controls['dieDate'].value,
      dieAidsDate: this.patientForm.controls['dieAidsDate'].value,
      arvtId: this.patientForm.controls['arvt'].value,
      invalidId: this.patientForm.controls['invalid'].value,
      snilsFedArchive: this.patientForm.controls['archive'].value,
      codeword: this.patientForm.controls['codeWord'].value,
      snils: this.patientForm.controls['snils'].value,
      fioChange: this.patientForm.controls['fioChange'].value
    };
    
    if(!(JSON.stringify(this.pervValue) === JSON.stringify(curValue))){
      this.patientService.updatePatient(curValue).subscribe()

      this.pervValue = {
        patientId: curValue.patientId,
        familyName: curValue.familyName,
        firstName: curValue.firstName,
        thirdName: curValue.thirdName,
        sexId: curValue.sexId,
        birthDate: curValue.birthDate,
        regOnDate: curValue.regOnDate,
        regOffDate: curValue.regOffDate,
        regOffReason: curValue.regOffReason,
        unrzFr1: curValue.unrzFr1,

        regionId: curValue.regionId,
        cityName: curValue.cityName,
        locationName: curValue.locationName,
        addrIndPhone: curValue.addrIndPhone,
        addrStreet: curValue.addrStreet,
        addrHouse: curValue.addrHouse,
        addrExt: curValue.addrExt,
        addrFlat: curValue.addrFlat,

        factRegionId: curValue.factRegionId,
        factCityName: curValue.factCityName,
        factLocationName: curValue.factLocationName,
        factAddrInd: curValue.factAddrInd,
        factAddrStreet: curValue.factAddrStreet,
        factAddrHouse: curValue.factAddrHouse,
        factAddrExt: curValue.factAddrExt,
        factAddrFlat: curValue.factAddrFlat,
        dtRegBeg: curValue.dtRegBeg,
        dtRegEnd: curValue.dtRegEnd,

        addrNameComm: curValue.addrNameComm,
        countryId: curValue.countryId,

        placeCheckId: curValue.placeCheckId,
        codeMkb10Id: curValue.codeMkb10Id,
        cardNo: curValue.cardNo,
        vulnerableGroupId: curValue.vulnerableGroupId,
        heightOld: curValue.heightOld,
        weightOld: curValue.weightOld,
        flgZamMedPart: curValue.flgZamMedPart,
        flgHeadPhysician: curValue.flgHeadPhysician,

        checkCourseId: curValue.checkCourseId,
        infectCourseId: curValue.infectCourseId,
        dieCourseId: curValue.dieCourseId,

        transfAreaDate: curValue.transfAreaDate,
        transfFederDate: curValue.transfFederDate,
        ufsinDate: curValue.ufsinDate,
        dieDate: curValue.dieDate,
        dieAidsDate: curValue.dieAidsDate,
        arvtId: curValue.arvtId,
        invalidId: curValue.invalidId,
        snilsFedArchive: curValue.snilsFedArchive,
        codeword: curValue.codeword,
        snils: curValue.snils,
        fioChange: curValue.fioChange
      };

      this.patientForm.markAsPristine()
    }
  }

  giveSdForUpd(isValid: boolean){
    this.sdIsValid = isValid;
  }

  giveStageForUpd(isValid: boolean){
    this.stageIsValid = isValid;
  }

  giveBlotForUpd(isValid: boolean){
    this.bIsValid = isValid;    
  }

  initForm(){
    this.PatineCardMainForm = new BehaviorSubject(this.fb.group(new PatientCardMainForm(this.patient, this.listService)));
    this.PatineCardMainForm$ = this.PatineCardMainForm.asObservable();

    this.patientFormSub = this.PatineCardMainForm$
      .subscribe(data => {
        this.patientForm = data;
    });

    this.patient.secondDeseases.map(
        (des: any) => {
          const desForm = new FormGroup ({
            startDate: new FormControl(des.startDate, Validators.required),
            endDate: new FormControl(des.endDate),
            deseas: new FormControl(des.deseas, {
              asyncValidators: [InList.validateDeseases(this.listService)],
              updateOn: 'blur'
            })
          });
          this.patientSecondDeseases.push(desForm);
        }
    );
    this.patient.stages.map(
      (e: any) => {
        const stageForm = new FormGroup ({
          stageDate: new FormControl(e.stageDate, Validators.required),
          stage: new FormControl(e.stage, {
            asyncValidators: [InList.validateStage(this.listService)],
            updateOn: 'blur'
          })
        });
        this.patientStages.push(stageForm);
      }
    );
    this.patient.blots.map(
      (e: any) => {
        const blotForm = new FormGroup ({
          blotId: new FormControl(e.blotId, [Validators.required, Validators.pattern("^[0-9]*$")]),
          blotNo: new FormControl(e.blotNo, Validators.pattern("^[0-9]*$")),
          blotDate: new FormControl(e.blotDate),
          blotRes: new FormControl(e.blotRes, {
                asyncValidators: [InList.validateIbResult(this.listService)],
                updateOn: 'blur'
              }),
          checkPlace: new FormControl(e.checkPlace, {
                asyncValidators: [InList.validateCheckPlace(this.listService)],
                updateOn: 'blur'
              }),
          first: new FormControl(e.first),
          last: new FormControl(e.last),
          ifa: new FormControl(e.ifa),
          inputDate: new FormControl({value: e.inputDate, disabled: true})
        });
        this.patientBlot.push(blotForm);
      }
    );
    this.patientForm.statusChanges.subscribe( (status) => {
      if(status == 'VALID')
        this.needUpd = true;
    })
    this.syncLongNShort()
  }

  syncLongNShort(){

    this.patientForm.controls['checkCourseShort'].statusChanges.subscribe((status) => {
      let index = this.patient.listCheckCourseShort.indexOf(this.patientForm.controls['checkCourseShort'].value)
      let indexLong = this.patient.listCheckCourseLong.indexOf(this.patientForm.controls['checkCourseLong'].value)
      if( index == indexLong)
        return null
      if(status != 'VALID')
        return null

      console.log('shortchange');
      this.patientForm.controls['checkCourseLong'].setValue( this.patient.listCheckCourseLong.at(index))
    })

    this.patientForm.controls['checkCourseLong'].statusChanges.subscribe((status) => {
      let index = this.patient.listCheckCourseLong.indexOf(this.patientForm.controls['checkCourseLong'].value)
      let indexShort = this.patient.listCheckCourseShort.indexOf(this.patientForm.controls['checkCourseShort'].value)
      if( index == indexShort)
        return null
      if(status != 'VALID')
        return null

      console.log('longchange');
      this.patientForm.controls['checkCourseShort'].setValue( this.patient.listCheckCourseShort.at(index))
    })

    this.patientForm.controls['infectCourseShort'].statusChanges.subscribe((status) => {
      let index = this.patient.listInfectCourseShort.indexOf(this.patientForm.controls['infectCourseShort'].value)
      let indexLong = this.patient.listInfectCourseLong.indexOf(this.patientForm.controls['infectCourseLong'].value)
      if( index == indexLong)
        return null
      if(status != 'VALID')
        return null

      console.log('shortchange');
      this.patientForm.controls['infectCourseLong'].setValue( this.patient.listInfectCourseLong.at(index))
    })

    this.patientForm.controls['infectCourseLong'].statusChanges.subscribe((status) => {
      let index = this.patient.listInfectCourseLong.indexOf(this.patientForm.controls['infectCourseLong'].value)
      let indexShort = this.patient.listInfectCourseShort.indexOf(this.patientForm.controls['infectCourseShort'].value)
      if( index == indexShort)
        return null
      if(status != 'VALID')
        return null

      console.log('longchange');
      this.patientForm.controls['infectCourseShort'].setValue( this.patient.listInfectCourseShort.at(index))
    })

    this.patientForm.controls['dieCourseShort'].statusChanges.subscribe((status) => {
      let index = this.patient.listDieCourseShort.indexOf(this.patientForm.controls['dieCourseShort'].value)
      let indexLong = this.patient.listDieCourseLong.indexOf(this.patientForm.controls['dieCourseLong'].value)
      if( index == indexLong)
        return null
      if(status != 'VALID')
        return null

      console.log('shortchange', index, indexLong);
      this.patientForm.controls['dieCourseLong'].setValue( this.patient.listDieCourseLong.at(index))
    })

    this.patientForm.controls['dieCourseLong'].statusChanges.subscribe((status) => {
      let index = this.patient.listDieCourseLong.indexOf(this.patientForm.controls['dieCourseLong'].value)
      let indexShort = this.patient.listDieCourseShort.indexOf(this.patientForm.controls['dieCourseShort'].value)
      if( index == indexShort)
        return null
      if(status != 'VALID')
        return null

      console.log('longchange',index, indexShort);
      this.patientForm.controls['dieCourseShort'].setValue( this.patient.listDieCourseShort.at(index))
    })
  }

  leaveComponent(name: string){
    if(this.patientForm.valid){
      if(this.needUpd)
        this.updatePatient()
      if(name == '/main'){
        this.router.navigate([name]);
        return null
      }
      this.router.navigate([name+this.Id])
    } else{
      Object.keys(this.patientForm.controls).forEach(
        (data: any) => {
          if(this.patientForm.controls[data].invalid)
            console.log(data);          
        }
      )
      confirm(`Ошибка в заполнении данных!`)
    }
  }
}
