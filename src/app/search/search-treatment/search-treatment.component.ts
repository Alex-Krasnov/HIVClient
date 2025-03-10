import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SearchSharedServiceService } from 'src/app/services/search/search-shared-service.service';
import { ListService } from 'src/app/services/list.service';
import { ModalService } from 'src/app/services/modal.service';
import { SearchTreatmentListsModel } from 'src/app/_interfaces/search-treatment-lists.model';
import { LoadingService } from 'src/app/services/loading.service';
import { BaseSearchComponent } from 'src/app/base/components/base-search.component';
import { UniversalSearchService } from 'src/app/services/search/universal-search.service';
import { SearchTreatmentModel } from 'src/app/models/search/search-treatment.model';

@Component({
  selector: 'app-search-treatment',
  templateUrl: './search-treatment.component.html',
  styleUrls: ['./search-treatment.component.css']
})
export class SearchTreatmentComponent  extends BaseSearchComponent<SearchTreatmentModel, SearchTreatmentListsModel>{

  constructor(
    searchService: UniversalSearchService<SearchTreatmentModel>,
    fb: FormBuilder,
    shared: SearchSharedServiceService,
    listService: ListService,
    modal: ModalService,
    loading: LoadingService
  ) {
    super(searchService, fb, shared, listService, modal, loading)
  }

  createFormValue(): SearchTreatmentModel {
    return new SearchTreatmentModel();
  }

  ngOnInit() {
    this.shared.switchVal('xl', true)
    this.shared.switchVal('print', false)
    this.shared.setNameSearch('Лечение')
    this.shared.visibleData$.next(false)

    this.initForm()

    this.shared.search$.subscribe(item => {
      if(item == 'Лечение')
        this.setData(false)
    })

    this.shared.excel$.subscribe(item => {
      if(item == 'Лечение')
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
        this.searchModel.form.controls['dieCourse'].setValue(lst)
        break
      case 6:
        this.searchModel.form.controls['checkCourse'].setValue(lst)
        break
      case 7:
        this.searchModel.form.controls['infectCourse'].setValue(lst)
        break
      case 8:
        this.searchModel.form.controls['showIllnes'].setValue(lst)
        break
      case 9:
        this.searchModel.form.controls['invalid'].setValue(lst)
        break
      case 10:  
        this.searchModel.form.controls['correspIllnesses'].setValue(lst)
        break
      case 11:
        this.searchModel.form.controls['schema'].setValue(lst)
        break
      case 12:
        this.searchModel.form.controls['schemaMedecine'].setValue(lst)
        break
      case 13:
        this.searchModel.form.controls['medecine'].setValue(lst)
        break
      case 14:
        this.searchModel.form.controls['medecineGive'].setValue(lst)
        break
      case 15:
        this.searchModel.form.controls['doctor'].setValue(lst)
        break
      case 16:
        this.searchModel.form.controls['schemaChange'].setValue(lst)
        break
      case 17:
        this.searchModel.form.controls['finSource'].setValue(lst)
        break
      case 18:
        this.searchModel.form.controls['art'].setValue(lst)
        break
      case 19:
        this.searchModel.form.controls['rangeTherapy'].setValue(lst)
        break
    }
  }
}