import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription, firstValueFrom } from 'rxjs';
import { Search } from 'src/app/_interfaces/search.model';
import { SearchSharedServiceService } from 'src/app/services/search-shared-service.service';
import { SearchMainInfForm } from './search-main-inf-form.model';
import { ListService } from 'src/app/services/list.service';
import { SearchMainInfService } from 'src/app/services/search-main-inf.service';
import { SearchMainInfModelLists } from 'src/app/_interfaces/search-main-inf-lists.model';
import { ModalService } from 'src/app/services/modal.service';
import { SearchMainInfModel } from 'src/app/_interfaces/search-main-inf.model';
import { Course } from 'src/app/_interfaces/course.model';

@Component({
  selector: 'app-search-main-inf',
  templateUrl: './search-main-inf.component.html',
  styleUrls: ['./search-main-inf.component.css']
})
export class SearchMainInfComponent implements OnInit{
  private SearchForm: BehaviorSubject<FormGroup | undefined>
  SearchForm$: Observable<FormGroup>
  SearchFormSub: Subscription
  searchLists: SearchMainInfModelLists

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
    private searchService: SearchMainInfService,
    private fb: FormBuilder,
    public shared: SearchSharedServiceService,
    private listService: ListService,
    public modal: ModalService
  ){}


  ngOnInit() {
    this.shared.switchVal('xl', true)
    this.shared.switchVal('print', false)
    this.shared.setNameSearch('Общие данные')
    this.shared.visibleData$.next(false)

    this.initForm()

    this.shared.search$.subscribe(item => {
      if(item == 'Общие данные')
        this.setData(false)
    })

    this.shared.excel$.subscribe(item => {
      if(item == 'Общие данные')
        this.setData(true)
    })
  }

  initForm(){
    this.searchService.getLists().subscribe((item: SearchMainInfModelLists) => {
      this.searchLists = item
    })

    this.SearchForm = new BehaviorSubject(this.fb.group(new SearchMainInfForm(this.listService)));
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
      
      let formValue: SearchMainInfModel = {
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
        regionFact: this.searchForm.controls['regionFact'].value as string[],
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
        archiveYNA: this.searchForm.controls['archiveYNA'].value,
        archive: this.searchForm.controls['archive'].value,
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
        unrzYNA: this.searchForm.controls['unrzYNA'].value,
        unrz: this.searchForm.controls['unrz'].value,
        dieDiagYNA: this.searchForm.controls['dieDiagYNA'].value,
        chemprof: this.searchForm.controls['chemprof'].value,
        dateChemprofStartStart: this.searchForm.controls['dateChemprofStartStart'].value,
        dateChemprofStartEnd: this.searchForm.controls['dateChemprofStartEnd'].value,
        dateChemprofEndStart: this.searchForm.controls['dateChemprofEndStart'].value,
        dateChemprofEndEnd: this.searchForm.controls['dateChemprofEndEnd'].value,
        dateRegStart: this.searchForm.controls['dateRegStart'].value,
        dateRegEnd: this.searchForm.controls['dateRegEnd'].value,
        regionPreset: this.searchForm.controls['regionPreset'].value,
        factRegionPreset: this.searchForm.controls['factRegionPreset'].value,
      
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
        selectArchive: this.searchForm.controls['selectArchive'].value,
        selectTransfArea: this.searchForm.controls['selectTransfArea'].value,
        selectFr: this.searchForm.controls['selectFr'].value,
        selectTransfFeder: this.searchForm.controls['selectTransfFeder'].value,
        selectUfsin: this.searchForm.controls['selectUfsin'].value,
        selectAids12: this.searchForm.controls['selectAids12'].value,
        selectUnrz: this.searchForm.controls['selectUnrz'].value,
        selectChemprof: this.searchForm.controls['selectChemprof'].value,
        selectDieDiag: this.searchForm.controls['selectDieDiag'].value,
        selectDateReg: this.searchForm.controls['selectDateReg'].value,
        selectPasSer: this.searchForm.controls['selectPasSer'].value,
        selectPasNum: this.searchForm.controls['selectPasNum'].value,
        selectPasWhom: this.searchForm.controls['selectPasWhom'].value,
        selectPasWhen: this.searchForm.controls['selectPasWhen'].value,
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
  
  async getSearchRes(value: SearchMainInfModel){
    const res = firstValueFrom(this.searchService.getData(value))

    this.dataView = {
      columName: (await res.then()).columName,
      resPage: (await res.then()).resPage
    }
    this.maxPage = Math.ceil((await res.then()).resCount / 100)
    
    this.resCount$.next((await res.then()).resCount)
    this.shared.visibleData$.next(true)
    this.shared.refreshData$.next(true)
  }

  async getExcel(value: SearchMainInfModel){
    this.searchService.downloadFile(value).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'res_search.xlsx';
      document.body.appendChild(downloadLink);
      downloadLink.click();
  
      URL.revokeObjectURL(downloadLink.href);
      document.body.removeChild(downloadLink);
    }, error => {
      console.error('Ошибка при скачивании файла:', error);
    });

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
    this.searchForm.controls['selectArchive'].setValue(true)
    this.searchForm.controls['selectTransfArea'].setValue(true)
    this.searchForm.controls['selectFr'].setValue(true)
    this.searchForm.controls['selectTransfFeder'].setValue(true)
    this.searchForm.controls['selectUfsin'].setValue(true)
    this.searchForm.controls['selectAids12'].setValue(true)
    this.searchForm.controls['selectUnrz'].setValue(true)
    this.searchForm.controls['selectChemprof'].setValue(true)
    this.searchForm.controls['selectDieDiag'].setValue(true)
    this.searchForm.controls['selectDateReg'].setValue(true)
    this.searchForm.controls['selectPasSer'].setValue(true)
    this.searchForm.controls['selectPasNum'].setValue(true)
    this.searchForm.controls['selectPasWhom'].setValue(true)
    this.searchForm.controls['selectPasWhen'].setValue(true)
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
    this.searchForm.controls['selectArchive'].setValue(false)
    this.searchForm.controls['selectTransfArea'].setValue(false)
    this.searchForm.controls['selectFr'].setValue(false)
    this.searchForm.controls['selectTransfFeder'].setValue(false)
    this.searchForm.controls['selectUfsin'].setValue(false)
    this.searchForm.controls['selectAids12'].setValue(false)
    this.searchForm.controls['selectUnrz'].setValue(false)
    this.searchForm.controls['selectChemprof'].setValue(false)
    this.searchForm.controls['selectDieDiag'].setValue(false)
    this.searchForm.controls['selectDateReg'].setValue(false)
    this.searchForm.controls['selectPasSer'].setValue(false)
    this.searchForm.controls['selectPasNum'].setValue(false)
    this.searchForm.controls['selectPasWhom'].setValue(false)
    this.searchForm.controls['selectPasWhen'].setValue(false)
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
    }
  }
}
