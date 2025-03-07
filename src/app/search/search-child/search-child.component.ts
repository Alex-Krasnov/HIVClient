import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchSharedServiceService } from 'src/app/services/search/search-shared-service.service';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';
import { SearchChildListsModel } from 'src/app/_interfaces/search-child-lists.model';
import { LoadingService } from 'src/app/services/loading.service';
import { BaseSearchComponent } from 'src/app/base/components/base-search.component';
import { UniversalSearchService } from 'src/app/services/search/universal-search.service';
import { SearchChildModel } from 'src/app/models/search/search-child.model';

@Component({
  selector: 'app-search-child',
  templateUrl: './search-child.component.html',
  styleUrls: ['./search-child.component.css']
})
export class SearchChildComponent extends BaseSearchComponent<SearchChildModel, SearchChildListsModel> {

  constructor(
    searchService: UniversalSearchService<SearchChildModel>,
    fb: FormBuilder,
    shared: SearchSharedServiceService,
    listService: ListService,
    modal: ModalService,
    loading: LoadingService
  ) {
    super(searchService, fb, shared, listService, modal, loading)
  }

  createFormValue(): SearchChildModel {
    return new SearchChildModel();
  }

  ngOnInit() {
    this.shared.switchVal('xl', true)
    this.shared.switchVal('print', false)
    this.shared.setNameSearch('Дети')
    this.shared.visibleData$.next(false)

    this.initForm()

    this.shared.search$.subscribe(item => {
      if (item == 'Дети')
        this.setData(false)
    })

    this.shared.excel$.subscribe(item => {
      if (item == 'Дети')
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

  giveList(lst: string[]) {
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
        this.searchModel.form.controls['familyType'].setValue(lst)
        break
      case 9:
        this.searchModel.form.controls['childPlace'].setValue(lst)
        break
      case 10:
        this.searchModel.form.controls['childPhp'].setValue(lst)
        break
      case 11:
        this.searchModel.form.controls['art'].setValue(lst)
        break
      case 12:
        this.searchModel.form.controls['materHome'].setValue(lst)
        break
    }
  }
}