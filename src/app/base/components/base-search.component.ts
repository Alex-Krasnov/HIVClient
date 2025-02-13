import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, firstValueFrom, Observable, Subscription } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ModalService } from 'src/app/services/modal.service';
import { SearchSharedServiceService } from 'src/app/services/search/search-shared-service.service';
import { Search } from 'src/app/_interfaces/search.model';
import { Course } from 'src/app/_interfaces/course.model';
import { UniversalSearchService } from 'src/app/services/search/universal-search.service';
import { BaseSearchModel } from 'src/app/base/models/base-search.model';
import { BaseSearchForm } from '../models/base-search-form.model';

@Component({
  template: ''
})
export abstract class BaseSearchComponent<T extends BaseSearchModel, F extends BaseSearchForm> implements OnInit {
  // protected SearchForm: BehaviorSubject<FormGroup | undefined>;
  // SearchForm$: Observable<FormGroup>;
  // SearchFormSub: Subscription;
  // searchLists: any; // Use a more specific type if possible

  @Input() search: boolean;
  searchForm: F;
  dataView: Search;
  resCount$ = new BehaviorSubject<number>(0);
  page = 1;
  maxPage = 0;
  modalList: string[];
  modal2ColList: Course[];
  selectedList: number;

  constructor(
    protected searchService: UniversalSearchService<T>,
    protected fb: FormBuilder,
    public shared: SearchSharedServiceService,
    protected listService: ListService,
    public modal: ModalService,
    protected loading: LoadingService
  ) {}

  ngOnInit() {
  }
  
  abstract createFormValue(): T
  abstract initForm(): void

  /** Подготовка данных для запроса поиска */
  setData(needXl: boolean) {
    if (this.searchForm.form.valid) {
      this.dataView = { columName: [], resPage: [] };
      this.maxPage = 0;
      this.resCount$.next(0);

      const formValue = this.createFormValue();

      for (let key of Object.keys(formValue)) {
        if (key === 'page' || key === 'excel') {
          continue;
        }
        formValue[key] = this.searchForm.form.controls[key].value;
      }

      formValue.page = this.page;
      formValue.excel = needXl;

      if (needXl) {
        this.getExcel(formValue);
      } else {
        this.getSearchRes(formValue);
      }
    }
  }
  
  async getSearchRes(value: T){
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
  
  async getExcel(value: T){
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
  
  /** Задать всем select значение true */
  markAll(){
    for (let key of Object.keys(this.searchForm.form.controls)) {
      if (key.indexOf('select') == -1) {
        continue;
      }
      this.searchForm.form.controls[key].setValue(true);
    }
  }

  /** Задать всем select значение false */
  dismarkAll(){
    for (let key of Object.keys(this.searchForm.form.controls)) {
      if (key.indexOf('select') == -1) {
        continue;
      }
      this.searchForm.form.controls[key].setValue(false);
    }
  }

  //#region пагинация

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

  //#endregion
}