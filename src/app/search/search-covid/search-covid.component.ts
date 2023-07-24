import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, firstValueFrom } from 'rxjs';
import { Search } from 'src/app/_interfaces/search.model';
import { SearchSharedServiceService } from 'src/app/services/search-shared-service.service';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';
import { Course } from 'src/app/_interfaces/course.model';
import { SearchCovidListsModel } from 'src/app/_interfaces/search-covid-lists.model';
import { SearchCovidService } from 'src/app/services/search-covid.service';
import { SearchCovidForm } from './search-covid-form.model';
import { SearchCovidModel } from 'src/app/_interfaces/search-covid.model';

@Component({
  selector: 'app-search-covid',
  templateUrl: './search-covid.component.html',
  styleUrls: ['./search-covid.component.css']
})
export class SearchCovidComponent  implements OnInit{
  private SearchForm: BehaviorSubject<FormGroup | undefined>
  SearchForm$: Observable<FormGroup>
  SearchFormSub: Subscription
  searchLists: SearchCovidListsModel

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
    private searchService: SearchCovidService,
    private fb: FormBuilder,
    public shared: SearchSharedServiceService,
    private listService: ListService,
    public modal: ModalService
  ){}


  ngOnInit() {
    this.shared.switchVal('xl', false)
    this.shared.switchVal('print', false)
    this.shared.setNameSearch('Covid')
    this.shared.visibleData$.next(false)

    this.initForm()

    this.shared.search$.subscribe(item => {
      if(item == 'Covid')
        this.getSearchRes()
    })
  }

  initForm(){
    this.searchService.getLists().subscribe((item: SearchCovidListsModel) => {
      this.searchLists = item
    })

    this.SearchForm = new BehaviorSubject(this.fb.group(new SearchCovidForm(this.listService)));
    this.SearchForm$ = this.SearchForm.asObservable();

    this.SearchFormSub = this.SearchForm$
      .subscribe(data => {
        this.searchForm = data;
    });
  }

  async getSearchRes(){
    if(this.searchForm.valid){
      this.dataView = {columName: [], resPage: []}
      this.maxPage = 0
      this.resCount$.next(0)
      
      let formValue: SearchCovidModel = {
        dateInpStart: this.searchForm.controls['dateInpStart'].value,
        dateInpEnd: this.searchForm.controls['dateInpEnd'].value,
        patientId: this.searchForm.controls['patientId'].value,
        familyName: this.searchForm.controls['familyName'].value,
        firstName: this.searchForm.controls['firstName'].value,
        thirdName: this.searchForm.controls['thirdName'].value,
        fioChange: this.searchForm.controls['fioChange'].value,
        sex: this.searchForm.controls['sex'].value,
        birthDateStart: this.searchForm.controls['birthDateStart'].value,
        birthDateEnd: this.searchForm.controls['birthDateEnd'].value,
        regionReg: this.searchForm.controls['regionReg'].value as string[],
        regionPreset: this.searchForm.controls['regionPreset'].value,
        regionFact: this.searchForm.controls['regionFact'].value as string[],
        factRegionPreset: this.searchForm.controls['factRegionPreset'].value,
        country: this.searchForm.controls['country'].value,
        dateRegOnStart: this.searchForm.controls['dateRegOnStart'].value,
        dateRegOnEnd: this.searchForm.controls['dateRegOnEnd'].value,
        dateUnRegStart: this.searchForm.controls['dateUnRegStart'].value,
        dateUnRegEnd: this.searchForm.controls['dateUnRegEnd'].value,
        unRegCourse: this.searchForm.controls['unRegCourse'].value,
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
        art: this.searchForm.controls['art'].value,
        mkb10: this.searchForm.controls['mkb10'].value,
        
        mkb10Covid: this.searchForm.controls['mkb10Covid'].value,
        mkb10Tuber: this.searchForm.controls['mkb10Tuber'].value,
        mkb10Pneumonia: this.searchForm.controls['mkb10Pneumonia'].value,
        hospCovid: this.searchForm.controls['hospCovid'].value,
        clinVarCovid: this.searchForm.controls['clinVarCovid'].value,
        courseCovid: this.searchForm.controls['courseCovid'].value,
        arterHyperYn: this.searchForm.controls['arterHyperYn'].value,
        diabetesYn: this.searchForm.controls['diabetesYn'].value,
        coronarySyndYn: this.searchForm.controls['coronarySyndYn'].value,
        hoblYn: this.searchForm.controls['hoblYn'].value,
        bronhAstmaYn: this.searchForm.controls['bronhAstmaYn'].value,
        cancerYn: this.searchForm.controls['cancerYn'].value,
        kidneyDesYn: this.searchForm.controls['kidneyDesYn'].value,
        outpatTreatYn: this.searchForm.controls['outpatTreatYn'].value,
        deathCovidYn: this.searchForm.controls['deathCovidYn'].value,
        oritYn: this.searchForm.controls['oritYn'].value,
        oxygenYn: this.searchForm.controls['oxygenYn'].value,
        typeAlvYn: this.searchForm.controls['typeAlvYn'].value,
        periodDesStart: this.searchForm.controls['periodDesStart'].value,
        periodDesEnd: this.searchForm.controls['periodDesEnd'].value,
        positivResCovidStart: this.searchForm.controls['positivResCovidStart'].value,
        positivResCovidEnd: this.searchForm.controls['positivResCovidEnd'].value,
        negativeResCovidStart: this.searchForm.controls['negativeResCovidStart'].value,
        negativeResCovidEnd: this.searchForm.controls['negativeResCovidEnd'].value,
        hospitalizationStart: this.searchForm.controls['hospitalizationStart'].value,
        hospitalizationEnd: this.searchForm.controls['hospitalizationEnd'].value,
        dischargeStart: this.searchForm.controls['dischargeStart'].value,
        dischargeEnd: this.searchForm.controls['dischargeEnd'].value,

      
        selectInpDate: this.searchForm.controls['selectInpDate'].value,
        selectPatientId: this.searchForm.controls['selectPatientId'].value,
        selectFio: this.searchForm.controls['selectFio'].value,
        selectSex: this.searchForm.controls['selectSex'].value,
        selectBirthDate: this.searchForm.controls['selectBirthDate'].value,
        selectRegion: this.searchForm.controls['selectRegion'].value,
        selectRegionFact: this.searchForm.controls['selectRegionFact'].value,
        selectCountry: this.searchForm.controls['selectCountry'].value,
        selectRegOnDate: this.searchForm.controls['selectRegOnDate'].value,
        selectStage: this.searchForm.controls['selectStage'].value,
        selectDieDate: this.searchForm.controls['selectDieDate'].value,
        selectCheckCourse: this.searchForm.controls['selectCheckCourse'].value,
        selectDieCourse: this.searchForm.controls['selectDieCourse'].value,
        selectInfectCourse: this.searchForm.controls['selectInfectCourse'].value,
        selectShowIllnes: this.searchForm.controls['selectShowIllnes'].value,
        selectIb: this.searchForm.controls['selectIb'].value,
        selectHospCourse: this.searchForm.controls['selectHospCourse'].value,
        selectArt: this.searchForm.controls['selectArt'].value,
        selectMkb10: this.searchForm.controls['selectMkb10'].value,
        
        selectMkb10Covid: this.searchForm.controls['selectMkb10Covid'].value,
        selectMkb10Tuber: this.searchForm.controls['selectMkb10Tuber'].value,
        selectMkb10Pneumonia: this.searchForm.controls['selectMkb10Pneumonia'].value,
        selectHospCovid: this.searchForm.controls['selectHospCovid'].value,
        selectClinVarCovid: this.searchForm.controls['selectClinVarCovid'].value,
        selectCourseCovid: this.searchForm.controls['selectCourseCovid'].value,
        selectArterHyper: this.searchForm.controls['selectArterHyper'].value,
        selectDiabetes: this.searchForm.controls['selectDiabetes'].value,
        selectCoronarySynd: this.searchForm.controls['selectCoronarySynd'].value,
        selectHobl: this.searchForm.controls['selectHobl'].value,
        selectBronhAstma: this.searchForm.controls['selectBronhAstma'].value,
        selectCancer: this.searchForm.controls['selectCancer'].value,
        selectKidneyDes: this.searchForm.controls['selectKidneyDes'].value,
        selectOutpatTreat: this.searchForm.controls['selectOutpatTreat'].value,
        selectDeathCovid: this.searchForm.controls['selectDeathCovid'].value,
        selectOrit: this.searchForm.controls['selectOrit'].value,
        selectOxygen: this.searchForm.controls['selectOxygen'].value,
        selectTypeAlv: this.searchForm.controls['selectTypeAlv'].value,
        selectPeriodDes: this.searchForm.controls['selectPeriodDes'].value,
        selectPositivResCovid: this.searchForm.controls['selectPositivResCovid'].value,
        selectNegativeResCovid: this.searchForm.controls['selectNegativeResCovid'].value,
        selectHospitalization: this.searchForm.controls['selectHospitalization'].value,
        selectDischarge: this.searchForm.controls['selectDischarge'].value,

        page: this.page 
      }

      const res = firstValueFrom(this.searchService.getData(formValue))

      this.dataView = {
        columName: (await res.then()).columName,
        resPage: (await res.then()).resPage
      }
      this.maxPage = Math.ceil((await res.then()).resCount / 100)
      
      this.resCount$.next((await res.then()).resCount)
      this.shared.visibleData$.next(true)
      this.shared.refreshData$.next(true)
    }
  }

  nextPage(){
    if(this.page < this.maxPage){
      this.page += 1
      this.getSearchRes()
    }
  }

  prevPage(){
    if(this.page > 1){
      this.page -= 1
      this.getSearchRes()
    }
  }

  firstPage(){
    this.page = 1
    this.getSearchRes()
  }

  lastPage(){
    this.page = this.maxPage
    this.getSearchRes()
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
    this.searchForm.controls['selectRegOnDate'].setValue(true)
    this.searchForm.controls['selectStage'].setValue(true)
    this.searchForm.controls['selectDieDate'].setValue(true)
    this.searchForm.controls['selectCheckCourse'].setValue(true)
    this.searchForm.controls['selectDieCourse'].setValue(true)
    this.searchForm.controls['selectInfectCourse'].setValue(true)
    this.searchForm.controls['selectShowIllnes'].setValue(true)
    this.searchForm.controls['selectIb'].setValue(true)
    this.searchForm.controls['selectHospCourse'].setValue(true)
    this.searchForm.controls['selectArt'].setValue(true)
    this.searchForm.controls['selectMkb10'].setValue(true)
    
    this.searchForm.controls['selectMkb10Covid'].setValue(true)
    this.searchForm.controls['selectMkb10Tuber'].setValue(true)
    this.searchForm.controls['selectMkb10Pneumonia'].setValue(true)
    this.searchForm.controls['selectHospCovid'].setValue(true)
    this.searchForm.controls['selectClinVarCovid'].setValue(true)
    this.searchForm.controls['selectCourseCovid'].setValue(true)
    this.searchForm.controls['selectArterHyper'].setValue(true)
    this.searchForm.controls['selectDiabetes'].setValue(true)
    this.searchForm.controls['selectCoronarySynd'].setValue(true)
    this.searchForm.controls['selectHobl'].setValue(true)
    this.searchForm.controls['selectBronhAstma'].setValue(true)
    this.searchForm.controls['selectCancer'].setValue(true)
    this.searchForm.controls['selectKidneyDes'].setValue(true)
    this.searchForm.controls['selectOutpatTreat'].setValue(true)
    this.searchForm.controls['selectDeathCovid'].setValue(true)
    this.searchForm.controls['selectOrit'].setValue(true)
    this.searchForm.controls['selectOxygen'].setValue(true)
    this.searchForm.controls['selectTypeAlv'].setValue(true)
    this.searchForm.controls['selectPeriodDes'].setValue(true)
    this.searchForm.controls['selectPositivResCovid'].setValue(true)
    this.searchForm.controls['selectNegativeResCovid'].setValue(true)
    this.searchForm.controls['selectHospitalization'].setValue(true)
    this.searchForm.controls['selectDischarge'].setValue(true)
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
    this.searchForm.controls['selectRegOnDate'].setValue(false)
    this.searchForm.controls['selectStage'].setValue(false)
    this.searchForm.controls['selectDieDate'].setValue(false)
    this.searchForm.controls['selectCheckCourse'].setValue(false)
    this.searchForm.controls['selectDieCourse'].setValue(false)
    this.searchForm.controls['selectInfectCourse'].setValue(false)
    this.searchForm.controls['selectShowIllnes'].setValue(false)
    this.searchForm.controls['selectIb'].setValue(false)
    this.searchForm.controls['selectHospCourse'].setValue(false)
    this.searchForm.controls['selectArt'].setValue(false)
    this.searchForm.controls['selectMkb10'].setValue(false)
    
    this.searchForm.controls['selectMkb10Covid'].setValue(false)
    this.searchForm.controls['selectMkb10Tuber'].setValue(false)
    this.searchForm.controls['selectMkb10Pneumonia'].setValue(false)
    this.searchForm.controls['selectHospCovid'].setValue(false)
    this.searchForm.controls['selectClinVarCovid'].setValue(false)
    this.searchForm.controls['selectCourseCovid'].setValue(false)
    this.searchForm.controls['selectArterHyper'].setValue(false)
    this.searchForm.controls['selectDiabetes'].setValue(false)
    this.searchForm.controls['selectCoronarySynd'].setValue(false)
    this.searchForm.controls['selectHobl'].setValue(false)
    this.searchForm.controls['selectBronhAstma'].setValue(false)
    this.searchForm.controls['selectCancer'].setValue(false)
    this.searchForm.controls['selectKidneyDes'].setValue(false)
    this.searchForm.controls['selectOutpatTreat'].setValue(false)
    this.searchForm.controls['selectDeathCovid'].setValue(false)
    this.searchForm.controls['selectOrit'].setValue(false)
    this.searchForm.controls['selectOxygen'].setValue(false)
    this.searchForm.controls['selectTypeAlv'].setValue(false)
    this.searchForm.controls['selectPeriodDes'].setValue(false)
    this.searchForm.controls['selectPositivResCovid'].setValue(false)
    this.searchForm.controls['selectNegativeResCovid'].setValue(false)
    this.searchForm.controls['selectHospitalization'].setValue(false)
    this.searchForm.controls['selectDischarge'].setValue(false)
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
        this.modalList = this.searchLists.listStage
        break
      case 5:
        this.modal2ColList = this.searchLists.listCheckCourse
        this.modal.course2ColOpen()
        return null
        break
      case 6:        
        this.modalList = this.searchLists.listDieCourse
        this.modal.dieOpen()
        return null
        break
      case 7:
        this.modalList = this.searchLists.listInfectCourse
        return null
        break
      case 8:
        this.modalList = this.searchLists.listShowIllness
        break
      case 9:
        this.modalList = this.searchLists.listHospCourse
        break
      case 10:
        this.modalList = this.searchLists.listArvt
        break
      case 11:
        this.modalList = this.searchLists.listCodeMKB10
        break
      case 12:
        this.modalList = this.searchLists.listMkb10Covid
        break
      case 13:
        this.modalList = this.searchLists.listMkb10Tuber
        break
      case 14:
        this.modalList = this.searchLists.listMkb10Pneumonia
        break
      case 15:
        this.modalList = this.searchLists.listOutHosp
        break
      case 16:
        this.modalList = this.searchLists.listClinVarCovid
        break
      case 17:
        this.modalList = this.searchLists.listCourseCovid
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
        this.searchForm.controls['stage'].setValue(lst)
        break
      case 5:
        this.searchForm.controls['checkCourse'].setValue(lst)
        break
      case 6:
        this.searchForm.controls['dieCourse'].setValue(lst)
        break
      case 7:
        this.searchForm.controls['infectCourse'].setValue(lst)
        break
      case 8:
        this.searchForm.controls['showIllnes'].setValue(lst)
        break
      case 9:
        this.searchForm.controls['hospCourse'].setValue(lst)
        break
      case 10:
        this.searchForm.controls['art'].setValue(lst)
        break
      case 11:
        this.searchForm.controls['mkb10'].setValue(lst)
        break
      case 12:
        this.searchForm.controls['mkb10Covid'].setValue(lst)
        break
      case 13:
        this.searchForm.controls['mkb10Tuber'].setValue(lst)
        break
      case 14:
        this.searchForm.controls['mkb10Pneumonia'].setValue(lst)
        break
      case 15:
        this.searchForm.controls['hospCovid'].setValue(lst)
        break
      case 16:
        this.searchForm.controls['clinVarCovid'].setValue(lst)
        break
      case 17:
        this.searchForm.controls['courseCovid'].setValue(lst)
        break
    }
  }
}