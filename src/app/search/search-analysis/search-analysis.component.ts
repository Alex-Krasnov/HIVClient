import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, firstValueFrom } from 'rxjs';
import { Search } from 'src/app/_interfaces/search.model';
import { SearchSharedServiceService } from 'src/app/services/search-shared-service.service';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';
import { Course } from 'src/app/_interfaces/course.model';
import { SearchAnalysisForm } from './search-analysis-form.model';
import { SearchAnalyseListsModel } from 'src/app/_interfaces/search-analyse-lists.model';
import { SearchAnalysisService } from 'src/app/services/search-analysis.service';
import { SearchAnalyseModel } from 'src/app/_interfaces/search-analyse.model';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-search-analysis',
  templateUrl: './search-analysis.component.html',
  styleUrls: ['./search-analysis.component.css']
})
export class SearchAnalysisComponent implements OnInit{
  private SearchForm: BehaviorSubject<FormGroup | undefined>
  SearchForm$: Observable<FormGroup>
  SearchFormSub: Subscription
  searchLists: SearchAnalyseListsModel

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
    private searchService: SearchAnalysisService,
    private fb: FormBuilder,
    public shared: SearchSharedServiceService,
    private listService: ListService,
    public modal: ModalService,
    private loading: LoadingService
  ){}


  ngOnInit() {
    this.shared.switchVal('xl', true)
    this.shared.switchVal('print', false)
    this.shared.setNameSearch('Лаб. диагностика')
    this.shared.visibleData$.next(false)

    this.initForm()

    this.shared.search$.subscribe(item => {
      if(item == 'Лаб. диагностика')
        this.setData(false)
    })

    this.shared.excel$.subscribe(item => {
      if(item == 'Лаб. диагностика')
        this.setData(true)
    })
  }

  initForm(){
    this.searchService.getLists().subscribe((item: SearchAnalyseListsModel) => {
      this.searchLists = item
    })
    
    this.SearchForm = new BehaviorSubject(this.fb.group(new SearchAnalysisForm(this.listService)));
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
      
      let formValue: SearchAnalyseModel = {
        dateInpStart: this.searchForm.controls['dateInpStart'].value,
        dateInpEnd: this.searchForm.controls['dateInpEnd'].value,
        patientId: this.searchForm.controls['patientId'].value,
        familyName: this.searchForm.controls['familyName'].value,
        firstName: this.searchForm.controls['firstName'].value,
        thirdName: this.searchForm.controls['thirdName'].value,
        sex: this.searchForm.controls['sex'].value,
        birthDateStart: this.searchForm.controls['birthDateStart'].value,
        birthDateEnd: this.searchForm.controls['birthDateEnd'].value,
        regionReg: this.searchForm.controls['regionReg'].value,
        regionPreset: this.searchForm.controls['regionPreset'].value,
        regionFact: this.searchForm.controls['regionFact'].value,
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
        stage: this.searchForm.controls['stage'].value,
        dateDieStart: this.searchForm.controls['dateDieStart'].value,
        dateDieEnd: this.searchForm.controls['dateDieEnd'].value,
        dateDieAidsStart: this.searchForm.controls['dateDieAidsStart'].value,
        dateDieAidsEnd: this.searchForm.controls['dateDieAidsEnd'].value,
        dieCourse: this.searchForm.controls['dieCourse'].value,
        diePreset: this.searchForm.controls['diePreset'].value,
        checkCourse: this.searchForm.controls['checkCourse'].value,
        infectCourse: this.searchForm.controls['infectCourse'].value,
        showIllnes: this.searchForm.controls['showIllnes'].value,
        dateShowIllnesStart: this.searchForm.controls['dateShowIllnesStart'].value,
        dateShowIllnesEnd: this.searchForm.controls['dateShowIllnesEnd'].value,
        transfAreaYNA: this.searchForm.controls['transfAreaYNA'].value,
        dateTransfAreaStart: this.searchForm.controls['dateTransfAreaStart'].value,
        dateTransfAreaEnd: this.searchForm.controls['dateTransfAreaEnd'].value,
        frYNA: this.searchForm.controls['frYNA'].value,
        zavApoYNA: this.searchForm.controls['zavApoYNA'].value,
        ibRes: this.searchForm.controls['ibRes'].value,
        dateIbResStart: this.searchForm.controls['dateIbResStart'].value,
        dateIbResEnd: this.searchForm.controls['dateIbResEnd'].value,
        ibNum: this.searchForm.controls['ibNum'].value,
        dateInpIbStart: this.searchForm.controls['dateInpIbStart'].value,
        dateInpIbEnd: this.searchForm.controls['dateInpIbEnd'].value,
        ibSelect: this.searchForm.controls['ibSelect'].value,
        ufsinYNA: this.searchForm.controls['ufsinYNA'].value,
        dateUfsinStart: this.searchForm.controls['dateUfsinStart'].value,
        dateUfsinEnd: this.searchForm.controls['dateUfsinEnd'].value,

        dateVlStart: this.searchForm.controls['dateVlStart'].value,
        dateVlEnd: this.searchForm.controls['dateVlEnd'].value,
        resVlStart: this.searchForm.controls['resVlStart'].value,
        resVlEnd: this.searchForm.controls['resVlEnd'].value,
        dateIMStart: this.searchForm.controls['dateIMStart'].value,
        dateImEnd: this.searchForm.controls['dateImEnd'].value,
        resImCd3Start: this.searchForm.controls['resImCd3Start'].value,
        resImCd3End: this.searchForm.controls['resImCd3End'].value,
        resImCd4Start: this.searchForm.controls['resImCd4Start'].value,
        resImCd4End: this.searchForm.controls['resImCd4End'].value,
        resImCd8Start: this.searchForm.controls['resImCd8Start'].value,
        resImCd8End: this.searchForm.controls['resImCd8End'].value,
        dateHepCIfaStart: this.searchForm.controls['dateHepCIfaStart'].value,
        dateHepCIfaEnd: this.searchForm.controls['dateHepCIfaEnd'].value,
        dateHepCIfaVal: this.searchForm.controls['hepCIfaPNA'].value,
        dateHepBIfaStart: this.searchForm.controls['dateHepBIfaStart'].value,
        dateHepBIfaEnd: this.searchForm.controls['dateHepBIfaEnd'].value,
        dateHepBIfaVal: this.searchForm.controls['hepBIfaPNA'].value,
        dateHepSyphIfaStart: this.searchForm.controls['dateHepSyphIfaStart'].value,
        dateHepSyphIfaEnd: this.searchForm.controls['dateHepSyphIfaEnd'].value,
        dateHepSyphIfaVal: this.searchForm.controls['hepSyphIfaPNA'].value,
        dateHepCStart: this.searchForm.controls['dateHepCStart'].value,
        dateHepCEnd: this.searchForm.controls['dateHepCEnd'].value,
        dateHepBStart: this.searchForm.controls['dateHepBStart'].value,
        dateHepBEnd: this.searchForm.controls['dateHepBEnd'].value,

        cardNo: this.searchForm.controls['cardNo'].value,
        art: this.searchForm.controls['art'].value,
        

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
        selectStage: this.searchForm.controls['selectStage'].value,
        selectDieDate: this.searchForm.controls['selectDieDate'].value,
        selectDieCourse: this.searchForm.controls['selectDieCourse'].value,
        selectCheckCourse: this.searchForm.controls['selectCheckCourse'].value,
        selectInfectCourse: this.searchForm.controls['selectInfectCourse'].value,
        selectShowIllnes: this.searchForm.controls['selectShowIllnes'].value,
        selectTransfArea: this.searchForm.controls['selectTransfArea'].value,
        selectFr: this.searchForm.controls['selectFr'].value,
        selectIb: this.searchForm.controls['selectIb'].value,
        selectUfsin: this.searchForm.controls['selectUfsin'].value,

        selectVlDate: this.searchForm.controls['selectVlDate'].value,
        selectVlRes: this.searchForm.controls['selectVlRes'].value,
        selectImDate: this.searchForm.controls['selectImDate'].value,
        selectImCd3Res: this.searchForm.controls['selectImCd3Res'].value,
        selectImCd4Res: this.searchForm.controls['selectImCd4Res'].value,
        selectImCd8Res: this.searchForm.controls['selectImCd8Res'].value,
        selectHepCIfa: this.searchForm.controls['selectHepCIfa'].value,
        selectHepBIfa: this.searchForm.controls['selectHepBIfa'].value,
        selectHepSyphIfa: this.searchForm.controls['selectHepSyphIfa'].value,
        selectHepC: this.searchForm.controls['selectHepC'].value,
        selectHepB: this.searchForm.controls['selectHepB'].value,

        selectCardNo: this.searchForm.controls['selectCardNo'].value,
        selectArt: this.searchForm.controls['selectArt'].value,

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
  
  async getSearchRes(value: SearchAnalyseModel){
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

  async getExcel(value: SearchAnalyseModel){
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
    this.searchForm.controls['selectStage'].setValue(true)
    this.searchForm.controls['selectDieDate'].setValue(true)
    this.searchForm.controls['selectDieCourse'].setValue(true)
    this.searchForm.controls['selectCheckCourse'].setValue(true)
    this.searchForm.controls['selectInfectCourse'].setValue(true)
    this.searchForm.controls['selectShowIllnes'].setValue(true)
    this.searchForm.controls['selectTransfArea'].setValue(true)
    this.searchForm.controls['selectFr'].setValue(true)
    this.searchForm.controls['selectIb'].setValue(true)
    this.searchForm.controls['selectUfsin'].setValue(true)

    this.searchForm.controls['selectCardNo'].setValue(true)
    this.searchForm.controls['selectArt'].setValue(true)
    this.searchForm.controls['selectVlDate'].setValue(true)
    this.searchForm.controls['selectVlRes'].setValue(true)
    this.searchForm.controls['selectImDate'].setValue(true)
    this.searchForm.controls['selectImCd3Res'].setValue(true)
    this.searchForm.controls['selectImCd4Res'].setValue(true)
    this.searchForm.controls['selectImCd8Res'].setValue(true)
    this.searchForm.controls['selectHepCIfa'].setValue(true)
    this.searchForm.controls['selectHepBIfa'].setValue(true)
    this.searchForm.controls['selectHepSyphIfa'].setValue(true)
    this.searchForm.controls['selectHepC'].setValue(true)
    this.searchForm.controls['selectHepB'].setValue(true)
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
    this.searchForm.controls['selectStage'].setValue(false)
    this.searchForm.controls['selectDieDate'].setValue(false)
    this.searchForm.controls['selectDieCourse'].setValue(false)
    this.searchForm.controls['selectCheckCourse'].setValue(false)
    this.searchForm.controls['selectInfectCourse'].setValue(false)
    this.searchForm.controls['selectShowIllnes'].setValue(false)
    this.searchForm.controls['selectTransfArea'].setValue(false)
    this.searchForm.controls['selectFr'].setValue(false)
    this.searchForm.controls['selectIb'].setValue(false)
    this.searchForm.controls['selectUfsin'].setValue(false)

    this.searchForm.controls['selectCardNo'].setValue(false)
    this.searchForm.controls['selectArt'].setValue(false)
    this.searchForm.controls['selectVlDate'].setValue(false)
    this.searchForm.controls['selectVlRes'].setValue(false)
    this.searchForm.controls['selectImDate'].setValue(false)
    this.searchForm.controls['selectImCd3Res'].setValue(false)
    this.searchForm.controls['selectImCd4Res'].setValue(false)
    this.searchForm.controls['selectImCd8Res'].setValue(false)
    this.searchForm.controls['selectHepCIfa'].setValue(false)
    this.searchForm.controls['selectHepBIfa'].setValue(false)
    this.searchForm.controls['selectHepSyphIfa'].setValue(false)
    this.searchForm.controls['selectHepC'].setValue(false)
    this.searchForm.controls['selectHepB'].setValue(false)
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
        this.modalList = this.searchLists.listDieCourse
        this.modal.dieOpen()
        return null
        break
      case 6:
        this.modal2ColList = this.searchLists.listCheckCourse
        this.modal.course2ColOpen()
        return null
        break
      case 7:
        this.modalList = this.searchLists.listInfectCourse
        break
      case 8:
        this.modalList = this.searchLists.listShowIllness
        break
      case 9:
        this.modalList = this.searchLists.listArvt
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
        this.searchForm.controls['dieCourse'].setValue(lst)
        break
      case 6:
        this.searchForm.controls['checkCourse'].setValue(lst)
        break
      case 7:
        this.searchForm.controls['infectCourse'].setValue(lst)
        break
      case 8:
        this.searchForm.controls['showIllnes'].setValue(lst)
        break
      case 9:
        this.searchForm.controls['art'].setValue(lst)
        break
    }
  }
}