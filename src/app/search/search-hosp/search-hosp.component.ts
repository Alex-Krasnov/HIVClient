import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchHospModelLists } from 'src/app/_interfaces/search-hosp-lists.model';
import { BaseSearchComponent } from 'src/app/base/components/base-search.component';
import { SearchHospModel } from 'src/app/models/search/search-hosp.model';
import { ListService } from 'src/app/services/list.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ModalService } from 'src/app/services/modal.service';
import { SearchSharedServiceService } from 'src/app/services/search/search-shared-service.service';
import { UniversalSearchService } from 'src/app/services/search/universal-search.service';

@Component({
  selector: 'app-search-hosp',
  templateUrl: './search-hosp.component.html',
  styleUrls: ['./search-hosp.component.css']
})
export class SearchHospComponent  extends BaseSearchComponent<SearchHospModel, SearchHospModelLists> {

  constructor(
    searchService: UniversalSearchService<SearchHospModel>,
    fb: FormBuilder,
    shared: SearchSharedServiceService,
    listService: ListService,
    modal: ModalService,
    loading: LoadingService
  ) {
    super(searchService, fb, shared, listService, modal, loading)
  }

  createFormValue(): SearchHospModel {
    return new SearchHospModel();
  }
  
  ngOnInit() {
    this.shared.switchVal('xl', true)
    this.shared.switchVal('print', false)
    this.shared.setNameSearch('Госпитализации')
    this.shared.visibleData$.next(false)

    this.initForm()

    this.shared.search$.subscribe(item => {
      if(item == 'Госпитализации')
        this.setData(false)
    })

    this.shared.excel$.subscribe(item => {
      if(item == 'Госпитализации')
        this.setData(true)
    })
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
        this.searchModel.form.controls['regionReg'].setValue(lst)
        break
      case 2:
        this.searchModel.form.controls['regionFact'].setValue(lst)
        break
      case 3:
        this.searchModel.form.controls['country'].setValue(lst)
        break
      case 4:
        this.searchModel.form.controls['stage'].setValue(lst)
        break
      case 5:
        this.searchModel.form.controls['checkCourse'].setValue(lst)
        break
      case 6:
        this.searchModel.form.controls['infectCourse'].setValue(lst)
        break
      case 7:
        this.searchModel.form.controls['lpu'].setValue(lst)
        break
      case 8:
        this.searchModel.form.controls['hospCourse'].setValue(lst)
        break
      case 9:
        this.searchModel.form.controls['hospResult'].setValue(lst)
        break
    }
  }
}