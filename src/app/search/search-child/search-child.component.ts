import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, firstValueFrom } from 'rxjs';
import { Search } from 'src/app/_interfaces/search.model';
import { SearchSharedServiceService } from 'src/app/services/search/search-shared-service.service';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';
import { Course } from 'src/app/_interfaces/course.model';
import { SearchChildService } from 'src/app/services/search/search-child.service';
import { SearchChildForm } from './search-child-form.model';
import { SearchChildListsModel } from 'src/app/_interfaces/search-child-lists.model';
import { SearchChildModel } from 'src/app/_interfaces/search-child.model';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-search-child',
  templateUrl: './search-child.component.html',
  styleUrls: ['./search-child.component.css']
})
export class SearchChildComponent  implements OnInit{
  private SearchForm: BehaviorSubject<FormGroup | undefined>
  SearchForm$: Observable<FormGroup>
  SearchFormSub: Subscription
  searchLists: SearchChildListsModel

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
    private searchService: SearchChildService,
    private fb: FormBuilder,
    public shared: SearchSharedServiceService,
    private listService: ListService,
    public modal: ModalService,
    private loading: LoadingService
  ){}


  ngOnInit() {
    this.shared.switchVal('xl', true)
    this.shared.switchVal('print', false)
    this.shared.setNameSearch('Дети')
    this.shared.visibleData$.next(false)

    this.initForm()

    this.shared.search$.subscribe(item => {
      if(item == 'Дети')
        this.setData(false)
    })

    this.shared.excel$.subscribe(item => {
      if(item == 'Дети')
        this.setData(true)
    })
  }

  initForm(){
    this.searchService.getLists().subscribe((item: SearchChildListsModel) => {
      this.searchLists = item
    })
    
    this.SearchForm = new BehaviorSubject(this.fb.group(new SearchChildForm(this.listService)));
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
      
      let formValue: SearchChildModel = {
        dateInpStart: this.searchForm.controls['dateInpStart'].value,
        dateInpEnd: this.searchForm.controls['dateInpEnd'].value,
        patientId: this.searchForm.controls['patientId'].value,
        familyName: this.searchForm.controls['familyName'].value,
        firstName: this.searchForm.controls['firstName'].value,
        thirdName: this.searchForm.controls['thirdName'].value,
        birthDateStart: this.searchForm.controls['birthDateStart'].value,
        birthDateEnd: this.searchForm.controls['birthDateEnd'].value,
        ageDayStart: this.searchForm.controls['ageDayStart'].value,
        ageDayEnd: this.searchForm.controls['ageDayEnd'].value,
        regionReg: this.searchForm.controls['regionReg'].value,
        regionPreset: this.searchForm.controls['regionPreset'].value,
        regionFact: this.searchForm.controls['regionFact'].value,
        factRegionPreset: this.searchForm.controls['factRegionPreset'].value,
        country: this.searchForm.controls['country'].value,
        dateRegOnStart: this.searchForm.controls['dateRegOnStart'].value,
        dateRegOnEnd: this.searchForm.controls['dateRegOnEnd'].value,
        dateUnRegStart: this.searchForm.controls['dateUnRegStart'].value,
        dateUnRegEnd: this.searchForm.controls['dateUnRegEnd'].value,
        unRegCourse: this.searchForm.controls['unRegCourse'].value,
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

        familyType: this.searchForm.controls['familyType'].value,
        firstCheckDateStart: this.searchForm.controls['firstCheckDateStart'].value,
        firstCheckDateEnd: this.searchForm.controls['firstCheckDateEnd'].value,
        childPlace: this.searchForm.controls['childPlace'].value,
        breastMonthNoStart: this.searchForm.controls['breastMonthNoStart'].value,
        breastMonthNoEnd: this.searchForm.controls['breastMonthNoEnd'].value,
        childPhp: this.searchForm.controls['childPhp'].value,
        sex: this.searchForm.controls['sex'].value,
        cardNo: this.searchForm.controls['cardNo'].value,
        motherPatientId: this.searchForm.controls['motherPatientId'].value,
        fatherPatientId: this.searchForm.controls['fatherPatientId'].value,
        art: this.searchForm.controls['art'].value,
        dateDieStart: this.searchForm.controls['dateDieStart'].value,
        dateDieEnd: this.searchForm.controls['dateDieEnd'].value,
        dateDieAidsStart: this.searchForm.controls['dateDieAidsStart'].value,
        dateDieAidsEnd: this.searchForm.controls['dateDieAidsEnd'].value,
        materHome: this.searchForm.controls['materHome'].value,
        form309: this.searchForm.controls['form309'].value,


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

        selectFamilyType: this.searchForm.controls['selectFamilyType'].value,
        selectFirstCheckDate: this.searchForm.controls['selectFirstCheckDate'].value,
        selectChildPlace: this.searchForm.controls['selectChildPlace'].value,
        selectBreastMonthNo: this.searchForm.controls['selectBreastMonthNo'].value,
        selectChildPhp: this.searchForm.controls['selectChildPhp'].value,
        selectSex: this.searchForm.controls['selectSex'].value,
        selectCardNo: this.searchForm.controls['selectCardNo'].value,
        selectParentId: this.searchForm.controls['selectParentId'].value,
        selectAddr: this.searchForm.controls['selectAddr'].value,
        selectArt: this.searchForm.controls['selectArt'].value,
        selectDieDate: this.searchForm.controls['selectDieDate'].value,
        selectMaterHome: this.searchForm.controls['selectMaterHome'].value,
        selectForm309: this.searchForm.controls['selectForm309'].value,

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
  
  async getSearchRes(value: SearchChildModel){
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

  async getExcel(value: SearchChildModel){
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

    this.searchForm.controls['selectFamilyType'].setValue(true)
    this.searchForm.controls['selectFirstCheckDate'].setValue(true)
    this.searchForm.controls['selectChildPlace'].setValue(true)
    this.searchForm.controls['selectBreastMonthNo'].setValue(true)
    this.searchForm.controls['selectChildPhp'].setValue(true)
    this.searchForm.controls['selectSex'].setValue(true)
    this.searchForm.controls['selectCardNo'].setValue(true)
    this.searchForm.controls['selectParentId'].setValue(true)
    this.searchForm.controls['selectAddr'].setValue(true)
    this.searchForm.controls['selectArt'].setValue(true)
    this.searchForm.controls['selectDieDate'].setValue(true)
    this.searchForm.controls['selectMaterHome'].setValue(true)
    this.searchForm.controls['selectForm309'].setValue(true)
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

    this.searchForm.controls['selectFamilyType'].setValue(false)
    this.searchForm.controls['selectFirstCheckDate'].setValue(false)
    this.searchForm.controls['selectChildPlace'].setValue(false)
    this.searchForm.controls['selectBreastMonthNo'].setValue(false)
    this.searchForm.controls['selectChildPhp'].setValue(false)
    this.searchForm.controls['selectSex'].setValue(false)
    this.searchForm.controls['selectCardNo'].setValue(false)
    this.searchForm.controls['selectParentId'].setValue(false)
    this.searchForm.controls['selectAddr'].setValue(false)
    this.searchForm.controls['selectArt'].setValue(false)
    this.searchForm.controls['selectDieDate'].setValue(false)
    this.searchForm.controls['selectMaterHome'].setValue(false)
    this.searchForm.controls['selectForm309'].setValue(false)
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
        this.modalList = this.searchLists.listFamilyType
        break
      case 9:
        this.modalList = this.searchLists.listChildPlace
        break
      case 10:
        this.modalList = this.searchLists.listPhp
        break
      case 11:
        this.modalList = this.searchLists.listArvt
        break
      case 12:
        this.modalList = this.searchLists.listMaterhome
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
        this.searchForm.controls['familyType'].setValue(lst)
        break
      case 9:
        this.searchForm.controls['childPlace'].setValue(lst)
        break
      case 10:
        this.searchForm.controls['childPhp'].setValue(lst)
        break
      case 11:
        this.searchForm.controls['art'].setValue(lst)
        break
      case 12:
        this.searchForm.controls['materHome'].setValue(lst)
        break
    }
  }
}