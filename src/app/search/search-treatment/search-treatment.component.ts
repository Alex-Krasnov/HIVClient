import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, firstValueFrom } from 'rxjs';
import { Search } from 'src/app/_interfaces/search.model';
import { SearchSharedServiceService } from 'src/app/services/search-shared-service.service';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';
import { Course } from 'src/app/_interfaces/course.model';
import { SearchTreatmentForm } from './search-treatment-form.model';
import { SearchTreatmentService } from 'src/app/services/search-treatment.service';
import { SearchTreatmentModel } from 'src/app/_interfaces/search-treatment.model';
import { SearchTreatmentListsModel } from 'src/app/_interfaces/search-treatment-lists.model';

@Component({
  selector: 'app-search-treatment',
  templateUrl: './search-treatment.component.html',
  styleUrls: ['./search-treatment.component.css']
})
export class SearchTreatmentComponent implements OnInit{
  private SearchForm: BehaviorSubject<FormGroup | undefined>
  SearchForm$: Observable<FormGroup>
  SearchFormSub: Subscription
  searchLists: SearchTreatmentListsModel

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
    private searchService: SearchTreatmentService,
    private fb: FormBuilder,
    public shared: SearchSharedServiceService,
    private listService: ListService,
    public modal: ModalService
  ){}


  ngOnInit() {
    this.shared.switchVal('xl', false)
    this.shared.switchVal('print', false)
    this.shared.setNameSearch('Лечение')
    this.shared.visibleData$.next(false)

    this.initForm()

    this.shared.search$.subscribe(item => {
      if(item == 'Лечение')
        this.getSearchRes()
    })
  }

  initForm(){
    this.searchService.getLists().subscribe((item: SearchTreatmentListsModel) => {
      this.searchLists = item
    })
    
    this.SearchForm = new BehaviorSubject(this.fb.group(new SearchTreatmentForm(this.listService)));
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
      
      let formValue: SearchTreatmentModel = {
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
        invalid: this.searchForm.controls['invalid'].value,
        correspIllnesses: this.searchForm.controls['correspIllnesses'].value,
        dateCorrespIllnessesStart: this.searchForm.controls['dateCorrespIllnessesStart'].value,
        dateCorrespIllnessesEnd: this.searchForm.controls['dateCorrespIllnessesEnd'].value,
        schema: this.searchForm.controls['schema'].value,
        schemaLast: this.searchForm.controls['schemaLast'].value, 
        schemaMedecine: this.searchForm.controls['schemaMedecine'].value,
        medecine: this.searchForm.controls['medecine'].value,
        medecineGive: this.searchForm.controls['medecineGive'].value,
        doctor: this.searchForm.controls['doctor'].value,
        dateGiveStart: this.searchForm.controls['dateGiveStart'].value,
        dateGiveEnd: this.searchForm.controls['dateGiveEnd'].value,
        schemaChange: this.searchForm.controls['schemaChange'].value,
        cardNo: this.searchForm.controls['cardNo'].value,
        dateSchemaStart: this.searchForm.controls['dateSchemaStart'].value,
        dateSchemaEnd: this.searchForm.controls['dateSchemaEnd'].value,
        finSource: this.searchForm.controls['finSource'].value,
        art: this.searchForm.controls['art'].value,
        rangeTherapy: this.searchForm.controls['rangeTherapy'].value,
        dateVlStart: this.searchForm.controls['dateVlStart'].value,
        dateVlEnd: this.searchForm.controls['dateVlEnd'].value,
        resVlStart: this.searchForm.controls['resVlStart'].value,
        resVlEnd: this.searchForm.controls['resVlEnd'].value,
        dateIMStart: this.searchForm.controls['dateIMStart'].value,
        dateImEnd: this.searchForm.controls['dateImEnd'].value,
        resImStart: this.searchForm.controls['resImStart'].value,
        resImEnd: this.searchForm.controls['resImEnd'].value,
        
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
        selectInvalid: this.searchForm.controls['selectInvalid'].value,
        selectCorrespIllnesses: this.searchForm.controls['selectCorrespIllnesses'].value,
        selectSchema: this.searchForm.controls['selectSchema'].value,
        selectSchemaMedecine: this.searchForm.controls['selectSchemaMedecine'].value,
        selectMedecine: this.searchForm.controls['selectMedecine'].value,
        selectMedecineGive: this.searchForm.controls['selectMedecineGive'].value,
        selectDoctor: this.searchForm.controls['selectDoctor'].value,
        selectGiveDate: this.searchForm.controls['selectGiveDate'].value,
        selectSchemaChange: this.searchForm.controls['selectSchemaChange'].value,
        selectCardNo: this.searchForm.controls['selectCardNo'].value,
        selectSchemaDate: this.searchForm.controls['selectSchemaDate'].value,
        selectFinSource: this.searchForm.controls['selectFinSource'].value,
        selectArt: this.searchForm.controls['selectArt'].value,
        selectRangeTherapy: this.searchForm.controls['selectRangeTherapy'].value,
        selectVlDate: this.searchForm.controls['selectVlDate'].value,
        selectVlRes: this.searchForm.controls['selectVlRes'].value,
        selectImDate: this.searchForm.controls['selectImDate'].value,
        selectImRes: this.searchForm.controls['selectImRes'].value,

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
    this.searchForm.controls['selectDieDate'].setValue(true)
    this.searchForm.controls['selectDieCourse'].setValue(true)
    this.searchForm.controls['selectCheckCourse'].setValue(true)
    this.searchForm.controls['selectInfectCourse'].setValue(true)
    this.searchForm.controls['selectShowIllnes'].setValue(true)
    this.searchForm.controls['selectTransfArea'].setValue(true)
    this.searchForm.controls['selectFr'].setValue(true)
    this.searchForm.controls['selectIb'].setValue(true)
    this.searchForm.controls['selectUfsin'].setValue(true)
    this.searchForm.controls['selectInvalid'].setValue(true)
    this.searchForm.controls['selectCorrespIllnesses'].setValue(true)
    this.searchForm.controls['selectSchema'].setValue(true)
    this.searchForm.controls['selectSchemaMedecine'].setValue(true)
    this.searchForm.controls['selectMedecine'].setValue(true)
    this.searchForm.controls['selectMedecineGive'].setValue(true)
    this.searchForm.controls['selectDoctor'].setValue(true)
    this.searchForm.controls['selectGiveDate'].setValue(true)
    this.searchForm.controls['selectSchemaChange'].setValue(true)
    this.searchForm.controls['selectCardNo'].setValue(true)
    this.searchForm.controls['selectSchemaDate'].setValue(true)
    this.searchForm.controls['selectFinSource'].setValue(true)
    this.searchForm.controls['selectArt'].setValue(true)
    this.searchForm.controls['selectRangeTherapy'].setValue(true)
    this.searchForm.controls['selectVlDate'].setValue(true)
    this.searchForm.controls['selectVlRes'].setValue(true)
    this.searchForm.controls['selectImDate'].setValue(true)
    this.searchForm.controls['selectImRes'].setValue(true)
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
    this.searchForm.controls['selectInvalid'].setValue(false)
    this.searchForm.controls['selectCorrespIllnesses'].setValue(false)
    this.searchForm.controls['selectSchema'].setValue(false)
    this.searchForm.controls['selectSchemaMedecine'].setValue(false)
    this.searchForm.controls['selectMedecine'].setValue(false)
    this.searchForm.controls['selectMedecineGive'].setValue(false)
    this.searchForm.controls['selectDoctor'].setValue(false)
    this.searchForm.controls['selectGiveDate'].setValue(false)
    this.searchForm.controls['selectSchemaChange'].setValue(false)
    this.searchForm.controls['selectCardNo'].setValue(false)
    this.searchForm.controls['selectSchemaDate'].setValue(false)
    this.searchForm.controls['selectFinSource'].setValue(false)
    this.searchForm.controls['selectArt'].setValue(false)
    this.searchForm.controls['selectRangeTherapy'].setValue(false)
    this.searchForm.controls['selectVlDate'].setValue(false)
    this.searchForm.controls['selectVlRes'].setValue(false)
    this.searchForm.controls['selectImDate'].setValue(false)
    this.searchForm.controls['selectImRes'].setValue(false)
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
        this.modalList = this.searchLists.listInvalid
        break
      case 10:
        this.modalList = this.searchLists.listCorrespIllness
        break
      case 11:
        this.modalList = this.searchLists.listSchema
        break
      case 12:
        this.modalList = this.searchLists.listSchemaMedecine
        break
      case 13:
        this.modalList = this.searchLists.listMedecine
        break
      case 14:
        this.modalList = this.searchLists.listMedecine
        break
      case 15:
        this.modalList = this.searchLists.listDoctor
        break
      case 16:
        this.modalList = this.searchLists.listSchemaChange
        break
      case 17:
        this.modalList = this.searchLists.listFinSourse
        break
      case 18:
        this.modalList = this.searchLists.listArvt
        break
      case 19:
        this.modalList = this.searchLists.listRangeTherapy
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
        this.searchForm.controls['invalid'].setValue(lst)
        break
      case 10:
        this.searchForm.controls['correspIllnesses'].setValue(lst)
        break
      case 11:
        this.searchForm.controls['schema'].setValue(lst)
        break
      case 12:
        this.searchForm.controls['schemaMedecine'].setValue(lst)
        break
      case 13:
        this.searchForm.controls['medecine'].setValue(lst)
        break
      case 14:
        this.searchForm.controls['medecineGive'].setValue(lst)
        break
      case 15:
        this.searchForm.controls['doctor'].setValue(lst)
        break
      case 16:
        this.searchForm.controls['schemaChange'].setValue(lst)
        break
      case 17:
        this.searchForm.controls['finSource'].setValue(lst)
        break
      case 18:
        this.searchForm.controls['art'].setValue(lst)
        break
      case 19:
        this.searchForm.controls['rangeTherapy'].setValue(lst)
        break
    }
  }
}