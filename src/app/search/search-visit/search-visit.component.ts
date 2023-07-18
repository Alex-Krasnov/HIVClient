import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, firstValueFrom } from 'rxjs';
import { Search } from 'src/app/_interfaces/search.model';
import { SearchSharedServiceService } from 'src/app/services/search-shared-service.service';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';
import { Course } from 'src/app/_interfaces/course.model';
import { SearchVisitModelLists } from 'src/app/_interfaces/search-visit-lists.model';
import { SearchVisitService } from 'src/app/services/search-visit.service';
import { SearchVisitForm } from './search-visit-form.model';
import { SearchVisitModel } from 'src/app/_interfaces/search-visit.model';

@Component({
  selector: 'app-search-visit',
  templateUrl: './search-visit.component.html',
  styleUrls: ['./search-visit.component.css']
})
export class SearchVisitComponent implements OnInit{
  private SearchForm: BehaviorSubject<FormGroup | undefined>
  SearchForm$: Observable<FormGroup>
  SearchFormSub: Subscription
  searchLists: SearchVisitModelLists

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
    private searchService: SearchVisitService,
    private fb: FormBuilder,
    public shared: SearchSharedServiceService,
    private listService: ListService,
    public modal: ModalService
  ){}


  ngOnInit() {
    this.shared.switchVal('xl', false)
    this.shared.switchVal('print', false)
    this.shared.setNameSearch('Явка на приём')
    this.shared.visibleData$.next(false)

    this.initForm()

    this.shared.search$.subscribe(item => {
      if(item == 'Явка на приём')
        this.getSearchRes()
    })
  }

  initForm(){
    this.searchService.getLists().subscribe((item: SearchVisitModelLists) => {
      this.searchLists = item
    })

    this.SearchForm = new BehaviorSubject(this.fb.group(new SearchVisitForm(this.listService)));
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
      
      let formValue: SearchVisitModel = {
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
        dateRegOnStart: this.searchForm.controls['dateRegOnStart'].value,
        dateRegOnEnd: this.searchForm.controls['dateRegOnEnd'].value,
        dateUnRegStart: this.searchForm.controls['dateUnRegStart'].value,
        dateUnRegEnd: this.searchForm.controls['dateUnRegEnd'].value,
        stage: this.searchForm.controls['stage'].value,
        checkCourse: this.searchForm.controls['checkCourse'].value,
        infectCourse: this.searchForm.controls['infectCourse'].value,
        showIllnes: this.searchForm.controls['showIllnes'].value,
        dateShowIllnesStart: this.searchForm.controls['dateShowIllnesStart'].value,
        dateShowIllnesEnd: this.searchForm.controls['dateShowIllnesEnd'].value,
        transfAreaYNA: this.searchForm.controls['transfAreaYNA'].value,
        dateTransfAreaStart: this.searchForm.controls['dateTransfAreaStart'].value,
        dateTransfAreaEnd: this.searchForm.controls['dateTransfAreaEnd'].value,
        ufsinYNA: this.searchForm.controls['ufsinYNA'].value,
        dateUfsinStart: this.searchForm.controls['dateUfsinStart'].value,
        dateUfsinEnd: this.searchForm.controls['dateUfsinEnd'].value,
        frYNA: this.searchForm.controls['frYNA'].value,
        zavApoYNA: this.searchForm.controls['zavApoYNA'].value,

        regDateStart: this.searchForm.controls['regDateStart'].value,
        regDateEnd: this.searchForm.controls['regDateEnd'].value,
        checkDateStart: this.searchForm.controls['checkDateStart'].value,
        checkDateEnd: this.searchForm.controls['checkDateEnd'].value,
        doctor: this.searchForm.controls['doctor'].value,
        cardNo: this.searchForm.controls['cardNo'].value,
        art: this.searchForm.controls['art'].value,
        regCheck: this.searchForm.controls['regCheck'].value,

        
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
        selectCheckCourse: this.searchForm.controls['selectCheckCourse'].value,
        selectInfectCourse: this.searchForm.controls['selectInfectCourse'].value,
        selectShowIllnes: this.searchForm.controls['selectShowIllnes'].value,
        selectTransfArea: this.searchForm.controls['selectTransfArea'].value,
        selectFr: this.searchForm.controls['selectFr'].value,
        selectUfsin: this.searchForm.controls['selectUfsin'].value,

        selectRegDate: this.searchForm.controls['selectRegDate'].value,
        selectCheckDate: this.searchForm.controls['selectCheckDate'].value,
        selectDoctor: this.searchForm.controls['selectDoctor'].value,
        selectCardNo: this.searchForm.controls['selectCardNo'].value,
        selectArt: this.searchForm.controls['selectArt'].value,
        selectAddr: this.searchForm.controls['selectAddr'].value,
        selectRegCheck: this.searchForm.controls['selectRegCheck'].value,

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
    this.searchForm.controls['selectCheckCourse'].setValue(true)
    this.searchForm.controls['selectInfectCourse'].setValue(true)
    this.searchForm.controls['selectShowIllnes'].setValue(true)
    this.searchForm.controls['selectTransfArea'].setValue(true)
    this.searchForm.controls['selectFr'].setValue(true)
    this.searchForm.controls['selectUfsin'].setValue(true)
    
    this.searchForm.controls['selectRegDate'].setValue(true)
    this.searchForm.controls['selectCheckDate'].setValue(true)
    this.searchForm.controls['selectDoctor'].setValue(true)
    this.searchForm.controls['selectCardNo'].setValue(true)
    this.searchForm.controls['selectArt'].setValue(true)
    this.searchForm.controls['selectAddr'].setValue(true)
    this.searchForm.controls['selectRegCheck'].setValue(true)
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
    this.searchForm.controls['selectCheckCourse'].setValue(false)
    this.searchForm.controls['selectInfectCourse'].setValue(false)
    this.searchForm.controls['selectShowIllnes'].setValue(false)
    this.searchForm.controls['selectTransfArea'].setValue(false)
    this.searchForm.controls['selectFr'].setValue(false)
    this.searchForm.controls['selectUfsin'].setValue(false)
    
    this.searchForm.controls['selectRegDate'].setValue(false)
    this.searchForm.controls['selectCheckDate'].setValue(false)
    this.searchForm.controls['selectDoctor'].setValue(false)
    this.searchForm.controls['selectCardNo'].setValue(false)
    this.searchForm.controls['selectArt'].setValue(false)
    this.searchForm.controls['selectAddr'].setValue(false)
    this.searchForm.controls['selectRegCheck'].setValue(false)
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
        this.modalList = this.searchLists.listInfectCourse
        break
      case 7:
        this.modalList = this.searchLists.listShowIllness
        break
      case 8:
        this.modalList = this.searchLists.listDoctor
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
        this.searchForm.controls['checkCourse'].setValue(lst)
        break
      case 6:
        this.searchForm.controls['infectCourse'].setValue(lst)
        break
      case 7:
        this.searchForm.controls['showIllnes'].setValue(lst)
        break
      case 8:
        this.searchForm.controls['doctor'].setValue(lst)
        break
      case 9:
        this.searchForm.controls['art'].setValue(lst)
        break
    }
  }
}