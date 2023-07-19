import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, firstValueFrom } from 'rxjs';
import { Search } from 'src/app/_interfaces/search.model';
import { SearchSharedServiceService } from 'src/app/services/search-shared-service.service';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';
import { Course } from 'src/app/_interfaces/course.model';
import { SearchHospForm } from './search-hosp-form.model';
import { SearchHospModelLists } from 'src/app/_interfaces/search-hosp-lists.model';
import { SearchHospService } from 'src/app/services/search-hosp.service';
import { SearchHospModel } from 'src/app/_interfaces/search-hosp.model';

@Component({
  selector: 'app-search-hosp',
  templateUrl: './search-hosp.component.html',
  styleUrls: ['./search-hosp.component.css']
})
export class SearchHospComponent implements OnInit{
  private SearchForm: BehaviorSubject<FormGroup | undefined>
  SearchForm$: Observable<FormGroup>
  SearchFormSub: Subscription
  searchLists: SearchHospModelLists

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
    private searchService: SearchHospService,
    private fb: FormBuilder,
    public shared: SearchSharedServiceService,
    private listService: ListService,
    public modal: ModalService
  ){}


  ngOnInit() {
    this.shared.switchVal('xl', false)
    this.shared.switchVal('print', false)
    this.shared.setNameSearch('Госпитализации')
    this.shared.visibleData$.next(false)

    this.initForm()

    this.shared.search$.subscribe(item => {
      if(item == 'Госпитализации')
        this.getSearchRes()
    })
  }

  initForm(){
    this.searchService.getLists().subscribe((item: SearchHospModelLists) => {
      this.searchLists = item
    })

    this.SearchForm = new BehaviorSubject(this.fb.group(new SearchHospForm(this.listService)));
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
      
      let formValue: SearchHospModel = {
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
        stage: this.searchForm.controls['stage'].value,
        checkCourse: this.searchForm.controls['checkCourse'].value,
        infectCourse: this.searchForm.controls['infectCourse'].value,
        transfAreaYNA: this.searchForm.controls['transfAreaYNA'].value,
        dateTransfAreaStart: this.searchForm.controls['dateTransfAreaStart'].value,
        dateTransfAreaEnd: this.searchForm.controls['dateTransfAreaEnd'].value,
        ufsinYNA: this.searchForm.controls['ufsinYNA'].value,
        dateUfsinStart: this.searchForm.controls['dateUfsinStart'].value,
        dateUfsinEnd: this.searchForm.controls['dateUfsinEnd'].value,
        frYNA: this.searchForm.controls['frYNA'].value,
        zavApoYNA: this.searchForm.controls['zavApoYNA'].value,
        
        dateHospInStart: this.searchForm.controls['dateHospInStart'].value,
        dateHospInEnd: this.searchForm.controls['dateHospInEnd'].value,
        dateHospOutStart: this.searchForm.controls['dateHospOutStart'].value,
        dateHospOutEnd: this.searchForm.controls['dateHospOutEnd'].value,
        lpu: this.searchForm.controls['lpu'].value,
        hospCourse: this.searchForm.controls['hospCourse'].value,
        hospResult: this.searchForm.controls['hospResult'].value,

        
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
        selectCheckCourse: this.searchForm.controls['selectCheckCourse'].value,
        selectInfectCourse: this.searchForm.controls['selectInfectCourse'].value,
        selectTransfArea: this.searchForm.controls['selectTransfArea'].value,
        selectFr: this.searchForm.controls['selectFr'].value,
        selectUfsin: this.searchForm.controls['selectUfsin'].value,
        
        selectDateHospIn: this.searchForm.controls['selectDateHospIn'].value,
        selectDateHospOut: this.searchForm.controls['selectDateHospOut'].value,
        selectLpu: this.searchForm.controls['selectLpu'].value,
        selectHospCourse: this.searchForm.controls['selectHospCourse'].value,
        selectHospResult: this.searchForm.controls['selectHospResult'].value,

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
    this.searchForm.controls['selectAddr'].setValue(true)
    this.searchForm.controls['selectRegOnDate'].setValue(true)
    this.searchForm.controls['selectStage'].setValue(true)
    this.searchForm.controls['selectCheckCourse'].setValue(true)
    this.searchForm.controls['selectInfectCourse'].setValue(true)
    this.searchForm.controls['selectTransfArea'].setValue(true)
    this.searchForm.controls['selectFr'].setValue(true)
    this.searchForm.controls['selectUfsin'].setValue(true)
    
    this.searchForm.controls['selectDateHospIn'].setValue(true)
    this.searchForm.controls['selectDateHospOut'].setValue(true)
    this.searchForm.controls['selectLpu'].setValue(true)
    this.searchForm.controls['selectHospCourse'].setValue(true)
    this.searchForm.controls['selectHospResult'].setValue(true)
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
    this.searchForm.controls['selectCheckCourse'].setValue(false)
    this.searchForm.controls['selectInfectCourse'].setValue(false)
    this.searchForm.controls['selectTransfArea'].setValue(false)
    this.searchForm.controls['selectFr'].setValue(false)
    this.searchForm.controls['selectUfsin'].setValue(false)
    
    this.searchForm.controls['selectDateHospIn'].setValue(false)
    this.searchForm.controls['selectDateHospOut'].setValue(false)
    this.searchForm.controls['selectLpu'].setValue(false)
    this.searchForm.controls['selectHospCourse'].setValue(false)
    this.searchForm.controls['selectHospResult'].setValue(false)
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
        this.modalList = this.searchLists.listLpu
        break
      case 8:
        this.modalList = this.searchLists.listHospCourse
        break
      case 9:
        this.modalList = this.searchLists.listHospResult
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
        this.searchForm.controls['lpu'].setValue(lst)
        break
      case 8:
        this.searchForm.controls['hospCourse'].setValue(lst)
        break
      case 9:
        this.searchForm.controls['hospResult'].setValue(lst)
        break
    }
  }
}