import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchSharedServiceService } from 'src/app/services/search/search-shared-service.service';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';
import { SearchPregnantListsModel } from 'src/app/_interfaces/search-pregnant-lists.model';
import { LoadingService } from 'src/app/services/loading.service';
import { UniversalSearchService } from 'src/app/services/search/universal-search.service';
import { SearchPregnantModel } from 'src/app/models/search/search-pregnant.model';
import { BaseSearchComponent } from 'src/app/base/components/base-search.component';

@Component({
  selector: 'app-search-pregnant',
  templateUrl: './search-pregnant.component.html',
  styleUrls: ['./search-pregnant.component.css']
})
export class SearchPregnantComponent extends BaseSearchComponent<SearchPregnantModel, SearchPregnantListsModel> {

  constructor(
    searchService: UniversalSearchService<SearchPregnantModel>,
    fb: FormBuilder,
    shared: SearchSharedServiceService,
    listService: ListService,
    modal: ModalService,
    loading: LoadingService
  ) {
    super(searchService, fb, shared, listService, modal, loading)
  }

  createFormValue(): SearchPregnantModel {
    return new SearchPregnantModel();
  }

  ngOnInit() {
    this.shared.switchVal('xl', true)
    this.shared.switchVal('print', false)
    this.shared.setNameSearch('Беременные')
    this.shared.visibleData$.next(false)

    this.initForm()

    this.shared.search$.subscribe(item => {
      if (item == 'Беременные')
        this.setData(false)
    })

    this.shared.excel$.subscribe(item => {
      if (item == 'Беременные')
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
        this.searchModel.form.controls['pregCheck'].setValue(lst)
        break
      case 9:
        this.searchModel.form.controls['birthType'].setValue(lst)
        break
      case 10:
        this.searchModel.form.controls['phpSchema1'].setValue(lst)
        break
      case 11:
        this.searchModel.form.controls['phpSchema2'].setValue(lst)
        break
      case 12:
        this.searchModel.form.controls['phpSchema3'].setValue(lst)
        break
      case 13:
        this.searchModel.form.controls['medecineForSchema1'].setValue(lst)
        break
      case 14:
        this.searchModel.form.controls['medecineForSchema2'].setValue(lst)
        break
      case 15:
        this.searchModel.form.controls['medecineForSchema3'].setValue(lst)
        break
      case 16:
        this.searchModel.form.controls['art'].setValue(lst)
        break
      case 17:
        this.searchModel.form.controls['materhome'].setValue(lst)
        break
    }
  }
}