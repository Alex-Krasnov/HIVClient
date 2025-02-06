import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchSharedServiceService } from 'src/app/services/search/search-shared-service.service';
import { SearchMainInfForm } from './search-main-inf-form.model';
import { ListService } from 'src/app/services/list.service';
import { SearchMainInfModelLists } from 'src/app/_interfaces/search-main-inf-lists.model';
import { ModalService } from 'src/app/services/modal.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UniversalSearchService } from 'src/app/services/search/universal-search.service';
import { SearchMainInfModel } from 'src/app/models/search/search-main-inf.model';
import { BaseSearchComponent } from '../../base/components/base-search.component';

@Component({
  selector: 'app-search-main-inf',
  templateUrl: './search-main-inf.component.html',
  styleUrls: ['./search-main-inf.component.css']
})
export class SearchMainInfComponent extends BaseSearchComponent<SearchMainInfModel, SearchMainInfForm, SearchMainInfModelLists> {

  constructor(
    searchService: UniversalSearchService<SearchMainInfModel>,
    fb: FormBuilder,
    shared: SearchSharedServiceService,
    listService: ListService,
    modal: ModalService,
    loading: LoadingService
  ) {
    super(searchService, fb, shared, listService, modal, loading)
    this.searchForm = new SearchMainInfForm(this.listService)
  }

  createFormValue(): SearchMainInfModel {
    return new SearchMainInfModel();
  }

  ngOnInit() {
    this.shared.switchVal('xl', true)
    this.shared.switchVal('print', false)
    this.shared.setNameSearch('Общие данные')
    this.shared.visibleData$.next(false)

    this.initForm()

    this.shared.search$.subscribe(item => {
      if (item == 'Общие данные')
        this.setData(false)
    })

    this.shared.excel$.subscribe(item => {
      if (item == 'Общие данные')
        this.setData(true)
    })
  }

  modalOpen(i: number) {
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

  giveList(lst: string[]) {
    switch (this.selectedList) {
      case 1:
        this.searchForm.form.controls['regionReg'].setValue(lst)
        break
      case 2:
        this.searchForm.form.controls['regionFact'].setValue(lst)
        break
      case 3:
        this.searchForm.form.controls['country'].setValue(lst)
        break
      case 4:
        this.searchForm.form.controls['blotCheckPlace'].setValue(lst)
        break
      case 5:
        this.searchForm.form.controls['stage'].setValue(lst)
        break
      case 6:
        this.searchForm.form.controls['checkCourse'].setValue(lst)
        break
      case 7:
        this.searchForm.form.controls['dieCourse'].setValue(lst)
        break
      case 8:
        this.searchForm.form.controls['infectCourse'].setValue(lst)
        break
      case 9:
        this.searchForm.form.controls['showIllnes'].setValue(lst)
        break
      case 10:
        this.searchForm.form.controls['hospCourse'].setValue(lst)
        break
      case 11:
        this.searchForm.form.controls['age'].setValue(lst)
        break
      case 12:
        this.searchForm.form.controls['art'].setValue(lst)
        break
      case 13:
        this.searchForm.form.controls['mkb10'].setValue(lst)
        break
    }
  }
}
