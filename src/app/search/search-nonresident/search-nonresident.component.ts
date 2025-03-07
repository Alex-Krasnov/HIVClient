import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchSharedServiceService } from 'src/app/services/search/search-shared-service.service';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UniversalSearchService } from 'src/app/services/search/universal-search.service';
import { BaseSearchComponent } from 'src/app/base/components/base-search.component';
import { SearchNonresidentModelLists } from 'src/app/_interfaces/search-nonresident-lists.model';
import { SearchNonresidentModel } from 'src/app/models/search/search-nonresident.model';
@Component({
  selector: 'app-search-nonresident',
  templateUrl: './search-nonresident.component.html',
  styleUrls: ['./search-nonresident.component.css']
})
export class SearchNonresidentComponent extends BaseSearchComponent<SearchNonresidentModel, SearchNonresidentModelLists> {

  constructor(
    searchService: UniversalSearchService<SearchNonresidentModel>,
    fb: FormBuilder,
    shared: SearchSharedServiceService,
    listService: ListService,
    modal: ModalService,
    loading: LoadingService
  ) {
    super(searchService, fb, shared, listService, modal, loading)
  }

  createFormValue(): SearchNonresidentModel {
    return new SearchNonresidentModel();
  }

  ngOnInit() {
    this.shared.switchVal('xl', true)
    this.shared.switchVal('print', false)
    this.shared.setNameSearch('Иногородние')
    this.shared.visibleData$.next(false)

    this.initForm()

    this.shared.search$.subscribe(item => {
      if(item == 'Иногородние')
        this.setData(false)
    })

    this.shared.excel$.subscribe(item => {
      if(item == 'Иногородние')
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
        this.modalList = this.searchLists.listShowIllness
        break
      case 8:
        this.modalList = this.searchLists.listRegion
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
        this.searchModel.form.controls['showIllnes'].setValue(lst)
        break
      case 8:
        this.searchModel.form.controls['placeDiagnosis'].setValue(lst)
        break
    }
  }
}