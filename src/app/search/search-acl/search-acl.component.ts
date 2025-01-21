import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, firstValueFrom } from 'rxjs';
import { Search } from 'src/app/_interfaces/search.model';
import { SearchSharedServiceService } from 'src/app/services/search/search-shared-service.service';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';
import { Course } from 'src/app/_interfaces/course.model';
import { SearchAclListsModel } from 'src/app/_interfaces/search-acl-lists.model';
import { SearchAclService } from 'src/app/services/search/search-acl.service';
import { SearchAclForm } from './search-acl-form.model';
import { SearchAclModel } from 'src/app/_interfaces/search-acl.model';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-search-acl',
  templateUrl: './search-acl.component.html',
  styleUrls: ['./search-acl.component.css']
})
export class SearchAclComponent  implements OnInit{
  private SearchForm: BehaviorSubject<FormGroup | undefined>
  SearchForm$: Observable<FormGroup>
  SearchFormSub: Subscription
  searchLists: SearchAclListsModel

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
    private searchService: SearchAclService,
    private fb: FormBuilder,
    public shared: SearchSharedServiceService,
    private listService: ListService,
    public modal: ModalService,
    private loading: LoadingService
  ){}


  ngOnInit() {
    this.shared.switchVal('xl', true)
    this.shared.switchVal('print', false)
    this.shared.setNameSearch('Acl')
    this.shared.visibleData$.next(false)

    this.initForm()

    this.shared.search$.subscribe(item => {
      if(item == 'Acl')
        this.setData(false)
    })

    this.shared.excel$.subscribe(item => {
      if(item == 'Acl')
        this.setData(true)
    })
  }

  initForm(){
    this.searchService.getLists().subscribe((item: SearchAclListsModel) => {
      this.searchLists = item
    })

    this.SearchForm = new BehaviorSubject(this.fb.group(new SearchAclForm(this.listService)));
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
      
      let formValue: SearchAclModel = {
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
        dateRegOnStart: this.searchForm.controls['dateRegOnStart'].value,
        dateRegOnEnd: this.searchForm.controls['dateRegOnEnd'].value,
        dateUnRegStart: this.searchForm.controls['dateUnRegStart'].value,
        dateUnRegEnd: this.searchForm.controls['dateUnRegEnd'].value,
        stage: this.searchForm.controls['stage'].value,
        checkCourse: this.searchForm.controls['checkCourse'].value,
        ibRes: this.searchForm.controls['ibRes'].value,
        dateIbResStart: this.searchForm.controls['dateIbResStart'].value,
        dateIbResEnd: this.searchForm.controls['dateIbResEnd'].value,
        ibNum: this.searchForm.controls['ibNum'].value,
        dateInpIbStart: this.searchForm.controls['dateInpIbStart'].value,
        dateInpIbEnd: this.searchForm.controls['dateInpIbEnd'].value,
        ibSelect: this.searchForm.controls['ibSelect'].value,
        aclTestCode1: this.searchForm.controls['aclTestCode1'].value,
        aclTestCode2: this.searchForm.controls['aclTestCode2'].value,
        aclTestCode3: this.searchForm.controls['aclTestCode3'].value,
        aclTestCode4: this.searchForm.controls['aclTestCode4'].value,
        aclTestCode5: this.searchForm.controls['aclTestCode5'].value,
        aclTestCode6: this.searchForm.controls['aclTestCode6'].value,
        aclTestCode7: this.searchForm.controls['aclTestCode7'].value,
        biochemistry: this.searchForm.controls['biochemistry'].value,
        hematology: this.searchForm.controls['hematology'].value,
        aclSampleDateStart: this.searchForm.controls['aclSampleDateStart'].value,
        aclSampleDateEnd: this.searchForm.controls['aclSampleDateEnd'].value,
        
        selectInpDate: this.searchForm.controls['selectInpDate'].value,
        selectPatientId: this.searchForm.controls['selectPatientId'].value,
        selectFio: this.searchForm.controls['selectFio'].value,
        selectSex: this.searchForm.controls['selectSex'].value,
        selectBirthDate: this.searchForm.controls['selectBirthDate'].value,
        selectRegion: this.searchForm.controls['selectRegion'].value,
        selectRegionFact: this.searchForm.controls['selectRegionFact'].value,
        selectRegOnDate: this.searchForm.controls['selectRegOnDate'].value,
        selectStage: this.searchForm.controls['selectStage'].value,
        selectCheckCourse: this.searchForm.controls['selectCheckCourse'].value,
        selectIb: this.searchForm.controls['selectIb'].value,
        selectTestCode: this.searchForm.controls['selectTestCode'].value,
        selectSampleDate: this.searchForm.controls['selectSampleDate'].value,
        
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
  
  async getSearchRes(value: SearchAclModel){
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

  async getExcel(value: SearchAclModel){
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

  // async getSearchRes(){
  //   if(this.searchForm.valid){
  //     this.dataView = {columName: [], resPage: []}
  //     this.maxPage = 0
  //     this.resCount$.next(0)
      
  //     let formValue: SearchAclModel = {
  //       dateInpStart: this.searchForm.controls['dateInpStart'].value,
  //       dateInpEnd: this.searchForm.controls['dateInpEnd'].value,
  //       patientId: this.searchForm.controls['patientId'].value,
  //       familyName: this.searchForm.controls['familyName'].value,
  //       firstName: this.searchForm.controls['firstName'].value,
  //       thirdName: this.searchForm.controls['thirdName'].value,
  //       sex: this.searchForm.controls['sex'].value,
  //       birthDateStart: this.searchForm.controls['birthDateStart'].value,
  //       birthDateEnd: this.searchForm.controls['birthDateEnd'].value,
  //       regionReg: this.searchForm.controls['regionReg'].value,
  //       regionPreset: this.searchForm.controls['regionPreset'].value,
  //       regionFact: this.searchForm.controls['regionFact'].value,
  //       factRegionPreset: this.searchForm.controls['factRegionPreset'].value,
  //       dateRegOnStart: this.searchForm.controls['dateRegOnStart'].value,
  //       dateRegOnEnd: this.searchForm.controls['dateRegOnEnd'].value,
  //       dateUnRegStart: this.searchForm.controls['dateUnRegStart'].value,
  //       dateUnRegEnd: this.searchForm.controls['dateUnRegEnd'].value,
  //       stage: this.searchForm.controls['stage'].value,
  //       checkCourse: this.searchForm.controls['checkCourse'].value,
  //       ibRes: this.searchForm.controls['ibRes'].value,
  //       dateIbResStart: this.searchForm.controls['dateIbResStart'].value,
  //       dateIbResEnd: this.searchForm.controls['dateIbResEnd'].value,
  //       ibNum: this.searchForm.controls['ibNum'].value,
  //       dateInpIbStart: this.searchForm.controls['dateInpIbStart'].value,
  //       dateInpIbEnd: this.searchForm.controls['dateInpIbEnd'].value,
  //       ibSelect: this.searchForm.controls['ibSelect'].value,
  //       aclTestCode1: this.searchForm.controls['aclTestCode1'].value,
  //       aclTestCode2: this.searchForm.controls['aclTestCode2'].value,
  //       aclTestCode3: this.searchForm.controls['aclTestCode3'].value,
  //       aclTestCode4: this.searchForm.controls['aclTestCode4'].value,
  //       aclTestCode5: this.searchForm.controls['aclTestCode5'].value,
  //       aclTestCode6: this.searchForm.controls['aclTestCode6'].value,
  //       aclTestCode7: this.searchForm.controls['aclTestCode7'].value,
  //       biochemistry: this.searchForm.controls['biochemistry'].value,
  //       hematology: this.searchForm.controls['hematology'].value,
  //       aclSampleDateStart: this.searchForm.controls['aclSampleDateStart'].value,
  //       aclSampleDateEnd: this.searchForm.controls['aclSampleDateEnd'].value,
        
  //       selectInpDate: this.searchForm.controls['selectInpDate'].value,
  //       selectPatientId: this.searchForm.controls['selectPatientId'].value,
  //       selectFio: this.searchForm.controls['selectFio'].value,
  //       selectSex: this.searchForm.controls['selectSex'].value,
  //       selectBirthDate: this.searchForm.controls['selectBirthDate'].value,
  //       selectRegion: this.searchForm.controls['selectRegion'].value,
  //       selectRegionFact: this.searchForm.controls['selectRegionFact'].value,
  //       selectRegOnDate: this.searchForm.controls['selectRegOnDate'].value,
  //       selectStage: this.searchForm.controls['selectStage'].value,
  //       selectCheckCourse: this.searchForm.controls['selectCheckCourse'].value,
  //       selectIb: this.searchForm.controls['selectIb'].value,
  //       selectTestCode: this.searchForm.controls['selectTestCode'].value,
  //       selectSampleDate: this.searchForm.controls['selectSampleDate'].value,
        
  //       page: this.page 
  //     }

  //     const res = firstValueFrom(this.searchService.getData(formValue))

  //     this.dataView = {
  //       columName: (await res.then()).columName,
  //       resPage: (await res.then()).resPage
  //     }
  //     this.maxPage = Math.ceil((await res.then()).resCount / 100)
      
  //     this.resCount$.next((await res.then()).resCount)
  //     this.shared.visibleData$.next(true)
  //     this.shared.refreshData$.next(true)
  //   }
  // }

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
    this.searchForm.controls['selectRegOnDate'].setValue(true)
    this.searchForm.controls['selectStage'].setValue(true)
    this.searchForm.controls['selectCheckCourse'].setValue(true)
    this.searchForm.controls['selectIb'].setValue(true)
    this.searchForm.controls['selectTestCode'].setValue(true)
    this.searchForm.controls['selectSampleDate'].setValue(true)
  }

  dismarkAll(){
    this.searchForm.controls['selectInpDate'].setValue(false)
    this.searchForm.controls['selectPatientId'].setValue(false)
    this.searchForm.controls['selectFio'].setValue(false)
    this.searchForm.controls['selectSex'].setValue(false)
    this.searchForm.controls['selectBirthDate'].setValue(false)
    this.searchForm.controls['selectRegion'].setValue(false)
    this.searchForm.controls['selectRegionFact'].setValue(false)
    this.searchForm.controls['selectRegOnDate'].setValue(false)
    this.searchForm.controls['selectStage'].setValue(false)
    this.searchForm.controls['selectCheckCourse'].setValue(false)
    this.searchForm.controls['selectIb'].setValue(false)
    this.searchForm.controls['selectTestCode'].setValue(false)
    this.searchForm.controls['selectSampleDate'].setValue(false)
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
        this.modalList = this.searchLists.listStage
        break
      case 4:
        this.modal2ColList = this.searchLists.listCheckCourse
        this.modal.course2ColOpen()
        return null
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
        this.searchForm.controls['stage'].setValue(lst)
        break
      case 4:
        this.searchForm.controls['checkCourse'].setValue(lst)
        break
    }
  }
}