import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, firstValueFrom } from 'rxjs';
import { Search } from 'src/app/_interfaces/search.model';
import { SearchSharedServiceService } from 'src/app/services/search-shared-service.service';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';
import { Course } from 'src/app/_interfaces/course.model';
import { SearchEpidForm } from './search-epid-form.model';
import { SearchEpidListsModel } from 'src/app/_interfaces/search-epid-lists.model';
import { SearchEpidService } from 'src/app/services/search-epid.service';
import { SearchEpidModel } from 'src/app/_interfaces/search-epid.model';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-search-epid',
  templateUrl: './search-epid.component.html',
  styleUrls: ['./search-epid.component.css']
})
export class SearchEpidComponent implements OnInit{
  private SearchForm: BehaviorSubject<FormGroup | undefined>
  SearchForm$: Observable<FormGroup>
  SearchFormSub: Subscription
  searchLists: SearchEpidListsModel

  @Input() search: boolean
  searchForm: FormGroup
  dataView: Search
  resCount$ = new BehaviorSubject<number>(0)
  page = 1
  maxPage = 0
  modalList: string[]
  modal2ColList: Course[]
  selectedList: number

  constructor(
    private searchService: SearchEpidService,
    private fb: FormBuilder,
    public shared: SearchSharedServiceService,
    private listService: ListService,
    public modal: ModalService,
    private loading: LoadingService
  ){}


  ngOnInit() {
    this.shared.switchVal('xl', true)
    this.shared.switchVal('print', false)
    this.shared.setNameSearch('Эпид. данные')
    this.shared.visibleData$.next(false)

    this.initForm()

    this.shared.search$.subscribe(item => {
      if(item == 'Эпид. данные')
        this.setData(false)
    })

    this.shared.excel$.subscribe(item => {
      if(item == 'Эпид. данные')
        this.setData(true)
    })
  }

  initForm(){
    this.searchService.getLists().subscribe((item: SearchEpidListsModel) => {
      this.searchLists = item
    })

    this.SearchForm = new BehaviorSubject(this.fb.group(new SearchEpidForm(this.listService)));
    this.SearchForm$ = this.SearchForm.asObservable();

    this.SearchFormSub = this.SearchForm$
      .subscribe(data => {
        this.searchForm = data;
    });
  }

  setData(needXl: boolean){
    if(this.searchForm.valid){
      this.dataView = {columName: [], resPage: []}
      this.maxPage = 0
      this.resCount$.next(0)
      
      let formValue: SearchEpidModel = {
        dateInpStart: this.searchForm.controls['dateInpStart'].value,
        dateInpEnd: this.searchForm.controls['dateInpEnd'].value,
        patientId: this.searchForm.controls['patientId'].value,
        familyName: this.searchForm.controls['familyName'].value,
        firstName: this.searchForm.controls['firstName'].value,
        thirdName: this.searchForm.controls['thirdName'].value,
        sex: this.searchForm.controls['sex'].value,
        birthDateStart: this.searchForm.controls['birthDateStart'].value,
        birthDateEnd: this.searchForm.controls['birthDateEnd'].value,
        regionReg: this.searchForm.controls['regionReg'].value as string[],
        regionPreset: this.searchForm.controls['regionPreset'].value,
        regionFact: this.searchForm.controls['regionFact'].value as string[],
        factRegionPreset: this.searchForm.controls['factRegionPreset'].value,
        country: this.searchForm.controls['country'].value,
        city: this.searchForm.controls['city'].value,
        location: this.searchForm.controls['location'].value,
        indx: this.searchForm.controls['indx'].value,
        street: this.searchForm.controls['street'].value,
        home: this.searchForm.controls['home'].value,
        dateRegOnStart: this.searchForm.controls['dateRegOnStart'].value,
        dateRegOnEnd: this.searchForm.controls['dateRegOnEnd'].value,
        dateUnRegStart: this.searchForm.controls['dateUnRegStart'].value,
        dateUnRegEnd: this.searchForm.controls['dateUnRegEnd'].value,
        unRegCourse: this.searchForm.controls['unRegCourse'].value,
        blotCheckPlace: this.searchForm.controls['blotCheckPlace'].value,
        stage: this.searchForm.controls['stage'].value,
        dateDieStart: this.searchForm.controls['dateDieStart'].value,
        dateDieEnd: this.searchForm.controls['dateDieEnd'].value,
        dateDieAidsStart: this.searchForm.controls['dateDieAidsStart'].value,
        dateDieAidsEnd: this.searchForm.controls['dateDieAidsEnd'].value,
        checkCourse: this.searchForm.controls['checkCourse'].value,
        dieCourse: this.searchForm.controls['dieCourse'].value,
        diePreset: this.searchForm.controls['diePreset'].value,
        infectCourse: this.searchForm.controls['infectCourse'].value,
        showIllnes: this.searchForm.controls['showIllnes'].value,
        dateShowIllnesStart: this.searchForm.controls['dateShowIllnesStart'].value,
        dateShowIllnesEnd: this.searchForm.controls['dateShowIllnesEnd'].value,
        ibRes: this.searchForm.controls['ibRes'].value,
        dateIbResStart: this.searchForm.controls['dateIbResStart'].value,
        dateIbResEnd: this.searchForm.controls['dateIbResEnd'].value,
        ibNum: this.searchForm.controls['ibNum'].value,
        dateInpIbStart: this.searchForm.controls['dateInpIbStart'].value,
        dateInpIbEnd: this.searchForm.controls['dateInpIbEnd'].value,
        ibSelect: this.searchForm.controls['ibSelect'].value,
        hospCourse: this.searchForm.controls['hospCourse'].value,
        age: this.searchForm.controls['age'].value,
        cardNo: this.searchForm.controls['cardNo'].value,
        art: this.searchForm.controls['art'].value,
        mkb10: this.searchForm.controls['mkb10'].value,
        transfAreaYNA: this.searchForm.controls['transfAreaYNA'].value,
        dateTransfAreaStart: this.searchForm.controls['dateTransfAreaStart'].value,
        dateTransfAreaEnd: this.searchForm.controls['dateTransfAreaEnd'].value,
        frYNA: this.searchForm.controls['frYNA'].value,
        zavApoYNA: this.searchForm.controls['zavApoYNA'].value,
        transfFederYNA: this.searchForm.controls['transfFederYNA'].value,
        dateTransfFederStart: this.searchForm.controls['dateTransfFederStart'].value,
        dateTransfFederEnd: this.searchForm.controls['dateTransfFederEnd'].value,
        ufsinYNA: this.searchForm.controls['ufsinYNA'].value,
        dateUfsinStart: this.searchForm.controls['dateUfsinStart'].value,
        dateUfsinEnd: this.searchForm.controls['dateUfsinEnd'].value,
        aids12: this.searchForm.controls['aids12'].value,

        dtMailRegStart: this.searchForm.controls['dtMailRegStart'].value,
        dtMailRegEnd: this.searchForm.controls['dtMailRegEnd'].value,
        education: this.searchForm.controls['education'].value,
        familyStatus: this.searchForm.controls['familyStatus'].value,
        employment: this.searchForm.controls['employment'].value,
        trans: this.searchForm.controls['trans'].value,
        placeCheck: this.searchForm.controls['placeCheck'].value,
        situationDetect: this.searchForm.controls['situationDetect'].value,
        transmisionMech: this.searchForm.controls['transmisionMech'].value,
        vulnerableGroup: this.searchForm.controls['vulnerableGroup'].value,
        vacName: this.searchForm.controls['vacName'].value,
        vacDateStart: this.searchForm.controls['vacDateStart'].value,
        vacDateEnd: this.searchForm.controls['vacDateEnd'].value,
        covidMkb10: this.searchForm.controls['covidMkb10'].value,
        covidDateStart: this.searchForm.controls['covidDateStart'].value,
        covidDateEnd: this.searchForm.controls['covidDateEnd'].value,
        chemsexYNA: this.searchForm.controls['chemsexYNA'].value,
        chemsexContactType: this.searchForm.controls['chemsexContactType'].value,
        pavInjYNA: this.searchForm.controls['pavInjYNA'].value,
        pavInjDateStart: this.searchForm.controls['pavInjDateStart'].value,
        pavInjDateEnd: this.searchForm.controls['pavInjDateEnd'].value,
        pavNotInjYNA: this.searchForm.controls['pavNotInjYNA'].value,
        pavNotInjDateStart: this.searchForm.controls['pavNotInjDateStart'].value,
        pavNotInjDateEnd: this.searchForm.controls['pavNotInjDateEnd'].value,
        timeInfectDateStart: this.searchForm.controls['timeInfectDateStart'].value,
        timeInfectDateEnd: this.searchForm.controls['timeInfectDateEnd'].value,

      
        selectInpDate: this.searchForm.controls['selectInpDate'].value,
        selectPatientId: this.searchForm.controls['selectPatientId'].value,
        selectFio: this.searchForm.controls['selectFio'].value,
        selectSex: this.searchForm.controls['selectSex'].value,
        selectBirthDate: this.searchForm.controls['selectBirthDate'].value,
        selectRegion: this.searchForm.controls['selectRegion'].value,
        selectRegionFact: this.searchForm.controls['selectRegionFact'].value,
        selectCountry: this.searchForm.controls['selectCountry'].value,
        selectAddr: this.searchForm.controls['selectAddr'].value,
        selectRegOnDate: this.searchForm.controls['selectRegOnDate'].value,
        selectBlotCheckPlace: this.searchForm.controls['selectBlotCheckPlace'].value,
        selectStage: this.searchForm.controls['selectStage'].value,
        selectDieDate: this.searchForm.controls['selectDieDate'].value,
        selectCheckCourse: this.searchForm.controls['selectCheckCourse'].value,
        selectDieCourse: this.searchForm.controls['selectDieCourse'].value,
        selectInfectCourse: this.searchForm.controls['selectInfectCourse'].value,
        selectShowIllnes: this.searchForm.controls['selectShowIllnes'].value,
        selectIb: this.searchForm.controls['selectIb'].value,
        selectHospCourse: this.searchForm.controls['selectHospCourse'].value,
        selectAge: this.searchForm.controls['selectAge'].value,
        selectCardNo: this.searchForm.controls['selectCardNo'].value,
        selectArt: this.searchForm.controls['selectArt'].value,
        selectMkb10: this.searchForm.controls['selectMkb10'].value,
        selectTransfArea: this.searchForm.controls['selectTransfArea'].value,
        selectFr: this.searchForm.controls['selectFr'].value,
        selectTransfFeder: this.searchForm.controls['selectTransfFeder'].value,
        selectUfsin: this.searchForm.controls['selectUfsin'].value,
        selectAids12: this.searchForm.controls['selectAids12'].value,

        selectDtMailReg: this.searchForm.controls['selectDtMailReg'].value,
        selectEdu: this.searchForm.controls['selectEdu'].value,
        selectFamilyStatus: this.searchForm.controls['selectFamilyStatus'].value,
        selectEmployment: this.searchForm.controls['selectEmployment'].value,
        selectTrans: this.searchForm.controls['selectTrans'].value,
        selectPlaceCheck: this.searchForm.controls['selectPlaceCheck'].value,
        selectSituationDetect: this.searchForm.controls['selectSituationDetect'].value,
        selectTransmisionMech: this.searchForm.controls['selectTransmisionMech'].value,
        selectVulnerableGroup: this.searchForm.controls['selectVulnerableGroup'].value,
        selectCovidVac: this.searchForm.controls['selectCovidVac'].value,
        selectCovid: this.searchForm.controls['selectCovid'].value,
        selectChemsex: this.searchForm.controls['selectChemsex'].value,
        selectPavInj: this.searchForm.controls['selectPavInj'].value,
        selectPavNotInj: this.searchForm.controls['selectPavNotInj'].value,
        selectTimeInfect: this.searchForm.controls['selectTimeInfect'].value,

        page: this.page,
        excel: needXl
      }

      if(needXl){
        this.getExcel(formValue)
      }else{
        this.getSearchRes(formValue)
      }
    }
  }
  
  async getSearchRes(value: SearchEpidModel){
    this.loading.open()
    const res = firstValueFrom(this.searchService.getData(value))

    this.dataView = {
      columName: (await res.then()).columName,
      resPage: (await res.then()).resPage
    }
    this.maxPage = Math.ceil((await res.then()).resCount / 100)
    
    this.resCount$.next((await res.then()).resCount)
    this.shared.visibleData$.next(true)
    this.shared.refreshData$.next(true)
    this.loading.close()
  }

  async getExcel(value: SearchEpidModel){
    this.loading.open()

    const data = firstValueFrom(this.searchService.downloadFile(value))
    const blob = new Blob([await data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'res_search.xlsx';
    document.body.appendChild(downloadLink);
    downloadLink.click();

    URL.revokeObjectURL(downloadLink.href);
    document.body.removeChild(downloadLink);
    
    this.loading.close()
    this.shared.visibleData$.next(false)
    this.shared.refreshData$.next(false)
  }

  nextPage(){
    if(this.page < this.maxPage){
      this.page += 1
      this.setData(false)
    }
  }

  prevPage(){
    if(this.page > 1){
      this.page -= 1
      this.setData(false)
    }
  }

  firstPage(){
    this.page = 1
    this.setData(false)
  }

  lastPage(){
    this.page = this.maxPage
    this.setData(false)
  }

  markAll(){
    this.searchForm.controls['selectInpDate'].setValue(true)
    this.searchForm.controls['selectPatientId'].setValue(true)
    this.searchForm.controls['selectFio'].setValue(true)
    this.searchForm.controls['selectSex'].setValue(true)
    this.searchForm.controls['selectBirthDate'].setValue(true)
    this.searchForm.controls['selectRegion'].setValue(true)
    this.searchForm.controls['selectRegionFact'].setValue(true)
    this.searchForm.controls['selectCountry'].setValue(true)
    this.searchForm.controls['selectAddr'].setValue(true)
    this.searchForm.controls['selectRegOnDate'].setValue(true)
    this.searchForm.controls['selectBlotCheckPlace'].setValue(true)
    this.searchForm.controls['selectStage'].setValue(true)
    this.searchForm.controls['selectDieDate'].setValue(true)
    this.searchForm.controls['selectCheckCourse'].setValue(true)
    this.searchForm.controls['selectDieCourse'].setValue(true)
    this.searchForm.controls['selectInfectCourse'].setValue(true)
    this.searchForm.controls['selectShowIllnes'].setValue(true)
    this.searchForm.controls['selectIb'].setValue(true)
    this.searchForm.controls['selectHospCourse'].setValue(true)
    this.searchForm.controls['selectAge'].setValue(true)
    this.searchForm.controls['selectCardNo'].setValue(true)
    this.searchForm.controls['selectArt'].setValue(true)
    this.searchForm.controls['selectMkb10'].setValue(true)
    this.searchForm.controls['selectTransfArea'].setValue(true)
    this.searchForm.controls['selectFr'].setValue(true)
    this.searchForm.controls['selectTransfFeder'].setValue(true)
    this.searchForm.controls['selectUfsin'].setValue(true)
    this.searchForm.controls['selectAids12'].setValue(true)
    
    this.searchForm.controls['selectDtMailReg'].setValue(true)
    this.searchForm.controls['selectEdu'].setValue(true)
    this.searchForm.controls['selectFamilyStatus'].setValue(true)
    this.searchForm.controls['selectEmployment'].setValue(true)
    this.searchForm.controls['selectTrans'].setValue(true)
    this.searchForm.controls['selectPlaceCheck'].setValue(true)
    this.searchForm.controls['selectSituationDetect'].setValue(true)
    this.searchForm.controls['selectTransmisionMech'].setValue(true)
    this.searchForm.controls['selectVulnerableGroup'].setValue(true)
    this.searchForm.controls['selectCovidVac'].setValue(true)
    this.searchForm.controls['selectCovid'].setValue(true)
    this.searchForm.controls['selectChemsex'].setValue(true)
    this.searchForm.controls['selectPavInj'].setValue(true)
    this.searchForm.controls['selectPavNotInj'].setValue(true)
    this.searchForm.controls['selectTimeInfect'].setValue(true)
  }

  dismarkAll(){
    this.searchForm.controls['selectInpDate'].setValue(false)
    this.searchForm.controls['selectPatientId'].setValue(false)
    this.searchForm.controls['selectFio'].setValue(false)
    this.searchForm.controls['selectSex'].setValue(false)
    this.searchForm.controls['selectBirthDate'].setValue(false)
    this.searchForm.controls['selectRegion'].setValue(false)
    this.searchForm.controls['selectRegionFact'].setValue(false)
    this.searchForm.controls['selectCountry'].setValue(false)
    this.searchForm.controls['selectAddr'].setValue(false)
    this.searchForm.controls['selectRegOnDate'].setValue(false)
    this.searchForm.controls['selectBlotCheckPlace'].setValue(false)
    this.searchForm.controls['selectStage'].setValue(false)
    this.searchForm.controls['selectDieDate'].setValue(false)
    this.searchForm.controls['selectCheckCourse'].setValue(false)
    this.searchForm.controls['selectDieCourse'].setValue(false)
    this.searchForm.controls['selectInfectCourse'].setValue(false)
    this.searchForm.controls['selectShowIllnes'].setValue(false)
    this.searchForm.controls['selectIb'].setValue(false)
    this.searchForm.controls['selectHospCourse'].setValue(false)
    this.searchForm.controls['selectAge'].setValue(false)
    this.searchForm.controls['selectCardNo'].setValue(false)
    this.searchForm.controls['selectArt'].setValue(false)
    this.searchForm.controls['selectMkb10'].setValue(false)
    this.searchForm.controls['selectTransfArea'].setValue(false)
    this.searchForm.controls['selectFr'].setValue(false)
    this.searchForm.controls['selectTransfFeder'].setValue(false)
    this.searchForm.controls['selectUfsin'].setValue(false)
    this.searchForm.controls['selectAids12'].setValue(false)
    
    this.searchForm.controls['selectDtMailReg'].setValue(false)
    this.searchForm.controls['selectEdu'].setValue(false)
    this.searchForm.controls['selectFamilyStatus'].setValue(false)
    this.searchForm.controls['selectEmployment'].setValue(false)
    this.searchForm.controls['selectTrans'].setValue(false)
    this.searchForm.controls['selectPlaceCheck'].setValue(false)
    this.searchForm.controls['selectSituationDetect'].setValue(false)
    this.searchForm.controls['selectTransmisionMech'].setValue(false)
    this.searchForm.controls['selectVulnerableGroup'].setValue(false)
    this.searchForm.controls['selectCovidVac'].setValue(false)
    this.searchForm.controls['selectCovid'].setValue(false)
    this.searchForm.controls['selectChemsex'].setValue(false)
    this.searchForm.controls['selectPavInj'].setValue(false)
    this.searchForm.controls['selectPavNotInj'].setValue(false)
    this.searchForm.controls['selectTimeInfect'].setValue(false)
  }

  modalOpen(i: number){
    this.selectedList = i

    switch (i) {
      case 1:
        this.modalList = this.searchLists.listRegion
        break
      case 2:
        this.modalList = this.searchLists.listRegion
        break
      case 3:
        this.modalList = this.searchLists.listCountry
        break
      case 4:
        this.modalList = this.searchLists.listCheckPlace
        break
      case 5:
        this.modalList = this.searchLists.listStage
        break
      case 6:        
        this.modal2ColList = this.searchLists.listCheckCourse
        this.modal.course2ColOpen()
        return null
        break
      case 7:
        this.modalList = this.searchLists.listDieCourse
        this.modal.dieOpen()
        return null
        break
      case 8:
        this.modalList = this.searchLists.listInfectCourse
        break
      case 9:
        this.modalList = this.searchLists.listShowIllness
        break
      case 10:
        this.modalList = this.searchLists.listHospCourse
        break
      case 11:
        this.modalList = this.searchLists.listAge
        break
      case 12:
        this.modalList = this.searchLists.listArvt
        break
      case 13:
        this.modalList = this.searchLists.listCodeMKB10
        break
      case 14:
        this.modalList = this.searchLists.listEducation
        break
      case 15:
        this.modalList = this.searchLists.listFamilyStatus
        break
      case 16:
        this.modalList = this.searchLists.listEmployment
        break
      case 17:
        this.modalList = this.searchLists.listTrans
        break
      case 18:
        this.modalList = this.searchLists.listPlaceCheck
        break
      case 19:
        this.modalList = this.searchLists.listSituationDetected
        break
      case 20:
        this.modalList = this.searchLists.listTransmisionMech
        break
      case 21:
        this.modalList = this.searchLists.listVulnerableGroup
        break
    }

    this.modal.open()
  }

  giveList(lst: string[]){
    switch (this.selectedList) {
      case 1:
        this.searchForm.controls['regionReg'].setValue(lst)
        break
      case 2:
        this.searchForm.controls['regionFact'].setValue(lst)
        break
      case 3:
        this.searchForm.controls['country'].setValue(lst)
        break
      case 4:
        this.searchForm.controls['blotCheckPlace'].setValue(lst)
        break
      case 5:
        this.searchForm.controls['stage'].setValue(lst)
        break
      case 6:
        this.searchForm.controls['checkCourse'].setValue(lst)
        break
      case 7:
        this.searchForm.controls['dieCourse'].setValue(lst)
        break
      case 8:
        this.searchForm.controls['infectCourse'].setValue(lst)
        break
      case 9:
        this.searchForm.controls['showIllnes'].setValue(lst)
        break
      case 10:
        this.searchForm.controls['hospCourse'].setValue(lst)
        break
      case 11:
        this.searchForm.controls['age'].setValue(lst)
        break
      case 12:
        this.searchForm.controls['art'].setValue(lst)
        break
      case 13:
        this.searchForm.controls['mkb10'].setValue(lst)
        break
      case 14:
        this.searchForm.controls['education'].setValue(lst)
        break
      case 15:
        this.searchForm.controls['familyStatus'].setValue(lst)
        break
      case 16:
        this.searchForm.controls['employment'].setValue(lst)
        break
      case 17:
        this.searchForm.controls['trans'].setValue(lst)
        break
      case 18:
        this.searchForm.controls['placeCheck'].setValue(lst)
        break
      case 19:
        this.searchForm.controls['situationDetect'].setValue(lst)
        break
      case 20:
        this.searchForm.controls['transmisionMech'].setValue(lst)
        break
      case 21:
        this.searchForm.controls['vulnerableGroup'].setValue(lst)
        break
    }
  }
}