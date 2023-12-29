import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, firstValueFrom } from 'rxjs';
import { Search } from 'src/app/_interfaces/search.model';
import { SearchSharedServiceService } from 'src/app/services/search-shared-service.service';
import { SearchPregnantForm } from './search-pregnant-form.model';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';
import { Course } from 'src/app/_interfaces/course.model';
import { SearchPregnantService } from 'src/app/services/search-pregnant.service';
import { SearchPregnantListsModel } from 'src/app/_interfaces/search-pregnant-lists.model';
import { SearchPregnantModel } from 'src/app/_interfaces/search-pregnant.model';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-search-pregnant',
  templateUrl: './search-pregnant.component.html',
  styleUrls: ['./search-pregnant.component.css']
})
export class SearchPregnantComponent implements OnInit{
  private SearchForm: BehaviorSubject<FormGroup | undefined>
  SearchForm$: Observable<FormGroup>
  SearchFormSub: Subscription
  searchLists: SearchPregnantListsModel

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
    private searchService: SearchPregnantService,
    private fb: FormBuilder,
    public shared: SearchSharedServiceService,
    private listService: ListService,
    public modal: ModalService,
    private loading: LoadingService
  ){}


  ngOnInit() {
    this.shared.switchVal('xl', true)
    this.shared.switchVal('print', false)
    this.shared.setNameSearch('Беременные')
    this.shared.visibleData$.next(false)

    this.initForm()

    this.shared.search$.subscribe(item => {
      if(item == 'Беременные')
        this.setData(false)
    })

    this.shared.excel$.subscribe(item => {
      if(item == 'Беременные')
        this.setData(true)
    })
  }

  initForm(){
    this.searchService.getLists().subscribe((item: SearchPregnantListsModel) => {
      this.searchLists = item
    })

    this.SearchForm = new BehaviorSubject(this.fb.group(new SearchPregnantForm(this.listService)));
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
      
      let formValue: SearchPregnantModel = {
        dateInpStart: this.searchForm.controls['dateInpStart'].value,
        dateInpEnd: this.searchForm.controls['dateInpEnd'].value,
        patientId: this.searchForm.controls['patientId'].value,
        familyName: this.searchForm.controls['familyName'].value,
        firstName: this.searchForm.controls['firstName'].value,
        thirdName: this.searchForm.controls['thirdName'].value,
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
        frYNA: this.searchForm.controls['frYNA'].value,
        zavApoYNA: this.searchForm.controls['zavApoYNA'].value,
        ufsinYNA: this.searchForm.controls['ufsinYNA'].value,
        dateUfsinStart: this.searchForm.controls['dateUfsinStart'].value,
        dateUfsinEnd: this.searchForm.controls['dateUfsinEnd'].value,
        pregCheck: this.searchForm.controls['pregCheck'].value,
        pregMonthNo: this.searchForm.controls['pregMonthNo'].value,
        birthType: this.searchForm.controls['birthType'].value,
        medecineStartMonthNo: this.searchForm.controls['medecineStartMonthNo'].value,
        childBirthDateStart: this.searchForm.controls['childBirthDateStart'].value,
        childBirthDateEnd: this.searchForm.controls['childBirthDateEnd'].value,
        childFamilyName: this.searchForm.controls['childFamilyName'].value,
        childFirstName: this.searchForm.controls['childFirstName'].value,
        childThirdName: this.searchForm.controls['childThirdName'].value,
        cardNo: this.searchForm.controls['cardNo'].value,
        phpSchema1: this.searchForm.controls['phpSchema1'].value,
        phpSchema2: this.searchForm.controls['phpSchema2'].value,
        phpSchema3: this.searchForm.controls['phpSchema3'].value,
        medecineForSchema1: this.searchForm.controls['medecineForSchema1'].value,
        medecineForSchema2: this.searchForm.controls['medecineForSchema2'].value,
        medecineForSchema3: this.searchForm.controls['medecineForSchema3'].value,
        art: this.searchForm.controls['art'].value,
        materhome: this.searchForm.controls['materhome'].value,
        aclDateStart: this.searchForm.controls['aclDateStart'].value,
        aclDateEnd: this.searchForm.controls['aclDateEnd'].value,
        aclMcnCodeStart: this.searchForm.controls['aclMcnCodeStart'].value,
        aclMcnCodeEnd: this.searchForm.controls['aclMcnCodeEnd'].value,
        
        selectInpDate: this.searchForm.controls['selectInpDate'].value,
        selectPatientId: this.searchForm.controls['selectPatientId'].value,
        selectFio: this.searchForm.controls['selectFio'].value,
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
        selectPregCheck: this.searchForm.controls['selectPregCheck'].value,
        selectPregMonthNo: this.searchForm.controls['selectPregMonthNo'].value,
        selectBirthType: this.searchForm.controls['selectBirthType'].value,
        selectMedecineStartMonthNo: this.searchForm.controls['selectMedecineStartMonthNo'].value,
        selectChildBirthDate: this.searchForm.controls['selectChildBirthDate'].value,
        selectChildFio: this.searchForm.controls['selectChildFio'].value,
        selectCardNo: this.searchForm.controls['selectCardNo'].value,
        selectPhpSchema1: this.searchForm.controls['selectPhpSchema1'].value,
        selectPhpSchema2: this.searchForm.controls['selectPhpSchema2'].value,
        selectPhpSchema3: this.searchForm.controls['selectPhpSchema3'].value,
        selectMedecineForSchema1: this.searchForm.controls['selectMedecineForSchema1'].value,
        selectMedecineForSchema2: this.searchForm.controls['selectMedecineForSchema2'].value,
        selectMedecineForSchema3: this.searchForm.controls['selectMedecineForSchema3'].value,
        selectArt: this.searchForm.controls['selectArt'].value,
        selectAddr: this.searchForm.controls['selectAddr'].value,
        selectMaterhome: this.searchForm.controls['selectMaterhome'].value,
        selectAclDate: this.searchForm.controls['selectAclDate'].value,
        selectAclMcnCode: this.searchForm.controls['selectAclMcnCode'].value,

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
  
  async getSearchRes(value: SearchPregnantModel){
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

  async getExcel(value: SearchPregnantModel){
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

    this.searchForm.controls['selectPregCheck'].setValue(true)
    this.searchForm.controls['selectPregMonthNo'].setValue(true)
    this.searchForm.controls['selectBirthType'].setValue(true)
    this.searchForm.controls['selectMedecineStartMonthNo'].setValue(true)
    this.searchForm.controls['selectChildBirthDate'].setValue(true)
    this.searchForm.controls['selectChildFio'].setValue(true)
    this.searchForm.controls['selectCardNo'].setValue(true)
    this.searchForm.controls['selectPhpSchema1'].setValue(true)
    this.searchForm.controls['selectPhpSchema2'].setValue(true)
    this.searchForm.controls['selectPhpSchema3'].setValue(true)
    this.searchForm.controls['selectMedecineForSchema1'].setValue(true)
    this.searchForm.controls['selectMedecineForSchema2'].setValue(true)
    this.searchForm.controls['selectMedecineForSchema3'].setValue(true)
    this.searchForm.controls['selectArt'].setValue(true)
    this.searchForm.controls['selectAddr'].setValue(true)
    this.searchForm.controls['selectMaterhome'].setValue(true)
    this.searchForm.controls['selectAclDate'].setValue(true)
    this.searchForm.controls['selectAclMcnCode'].setValue(true)
  }

  dismarkAll(){
    this.searchForm.controls['selectInpDate'].setValue(false)
    this.searchForm.controls['selectPatientId'].setValue(false)
    this.searchForm.controls['selectFio'].setValue(false)
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

    this.searchForm.controls['selectPregCheck'].setValue(false)
    this.searchForm.controls['selectPregMonthNo'].setValue(false)
    this.searchForm.controls['selectBirthType'].setValue(false)
    this.searchForm.controls['selectMedecineStartMonthNo'].setValue(false)
    this.searchForm.controls['selectChildBirthDate'].setValue(false)
    this.searchForm.controls['selectChildFio'].setValue(false)
    this.searchForm.controls['selectCardNo'].setValue(false)
    this.searchForm.controls['selectPhpSchema1'].setValue(false)
    this.searchForm.controls['selectPhpSchema2'].setValue(false)
    this.searchForm.controls['selectPhpSchema3'].setValue(false)
    this.searchForm.controls['selectMedecineForSchema1'].setValue(false)
    this.searchForm.controls['selectMedecineForSchema2'].setValue(false)
    this.searchForm.controls['selectMedecineForSchema3'].setValue(false)
    this.searchForm.controls['selectArt'].setValue(false)
    this.searchForm.controls['selectAddr'].setValue(false)
    this.searchForm.controls['selectMaterhome'].setValue(false)
    this.searchForm.controls['selectAclDate'].setValue(false)
    this.searchForm.controls['selectAclMcnCode'].setValue(false)
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
        this.modalList = this.searchLists.listPregCheck
        break
      case 9:
        this.modalList = this.searchLists.listBirthType
        break
      case 10:
        this.modalList = this.searchLists.listSchema
        break
      case 11:
        this.modalList = this.searchLists.listSchema
        break
      case 12:
        this.modalList = this.searchLists.listSchema
        break
      case 13:
        this.modalList = this.searchLists.listMedecineForSchema
        break
      case 14:
        this.modalList = this.searchLists.listMedecineForSchema
        break
      case 15:
        this.modalList = this.searchLists.listMedecineForSchema
        break
      case 16:
        this.modalList = this.searchLists.listArvt
        break
      case 17:
        this.modalList = this.searchLists.listMaterHome
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
        this.searchForm.controls['pregCheck'].setValue(lst)
        break
      case 9:
        this.searchForm.controls['birthType'].setValue(lst)
        break
      case 10:
        this.searchForm.controls['phpSchema1'].setValue(lst)
        break
      case 11:
        this.searchForm.controls['phpSchema2'].setValue(lst)
        break
      case 12:
        this.searchForm.controls['phpSchema3'].setValue(lst)
        break
      case 13:
        this.searchForm.controls['medecineForSchema1'].setValue(lst)
        break
      case 14:
        this.searchForm.controls['medecineForSchema2'].setValue(lst)
        break
      case 15:
        this.searchForm.controls['medecineForSchema3'].setValue(lst)
        break
      case 16:
        this.searchForm.controls['art'].setValue(lst)
        break
      case 17:
        this.searchForm.controls['materhome'].setValue(lst)
        break
    }
  }
}
