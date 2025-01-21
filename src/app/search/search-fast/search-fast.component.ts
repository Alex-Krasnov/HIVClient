import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { SearchFastFormModel } from 'src/app/_interfaces/search-fast-form.model';
import { Search } from 'src/app/_interfaces/search.model';
import { LoadingService } from 'src/app/services/loading.service';
import { SearchFastService } from 'src/app/services/search/search-fast.service';
import { SearchSharedServiceService } from 'src/app/services/search/search-shared-service.service';

@Component({
  selector: 'app-search-fast',
  templateUrl: './search-fast.component.html',
  styleUrls: ['./search-fast.component.css']
})
export class SearchFastComponent implements OnInit{

  @Input() search: boolean;
  SearchForm: FormGroup;
  dataView: Search;
  resCount$ = new BehaviorSubject<number>(0);
  page = 1;
  maxPage = 1;

  constructor(
    private searchService: SearchFastService,
    private fb: FormBuilder,
    public shared: SearchSharedServiceService,
    private loading: LoadingService
  ){}


  ngOnInit() {
    this.shared.switchVal('xl', false)
    this.shared.switchVal('print', false)
    this.shared.switchVal('next', false)
    this.shared.switchVal('prev', false)
    this.shared.setNameSearch('Быстрый поиск')
    this.shared.visibleData$.next(false)

    this.SearchForm = this.fb.group({
      patientId: new FormControl(''),
      cardNo: new FormControl(''),
      familyName: new FormControl(''),
      firstName: new FormControl(''),
      thirdName: new FormControl(''),
      birthDateStart: new FormControl(''),
      birthDateEnd: new FormControl('')
    });

    this.shared.search$.subscribe(item => {
      if(item == 'Быстрый поиск')
        this.getSearchRes()
    })
  }

  async getSearchRes(){
    this.loading.open()

    let IsNull: boolean = this.SearchForm.controls['patientId'].value == null &&
      this.SearchForm.get('familyName').value == null &&
      this.SearchForm.get('firstName').value == null &&
      this.SearchForm.get('thirdName').value == null &&
      this.SearchForm.get('birthDateStart').value == null &&
      this.SearchForm.get('birthDateEnd').value == null &&
      this.SearchForm.get('cardNo').value == null

    if(!IsNull){
      let formValue: SearchFastFormModel = {
        patientId: this.SearchForm.get('patientId').value,
        cardNo: this.SearchForm.get('cardNo').value,
        familyName: this.SearchForm.get('familyName').value,
        firstName: this.SearchForm.get('firstName').value,
        thirdName: this.SearchForm.get('thirdName').value,
        birthDateStart: this.SearchForm.get('birthDateStart').value,
        birthDateEnd: this.SearchForm.get('birthDateEnd').value,
        page: this.page 
      }
      const a = firstValueFrom(this.searchService.getData(formValue))

      this.dataView = {
        columName: (await a.then()).columName,
        resPage: (await a.then()).resPage
      }
      this.maxPage = Math.ceil((await a.then()).resCount / 100)
      
      this.resCount$.next((await a.then()).resCount)
      this.shared.visibleData$.next(true)
      this.shared.refreshData$.next(true)
      this.loading.close()
    }
  }

  nextPage(){
    if(this.page < this.maxPage){
      this.page += 1
      this.getSearchRes()
    }
  }

  prevPage(){
    if(this.page > 1){
      this.page -= 1
      this.getSearchRes()
    }
  }

  firstPage(){
    this.page = 1
    this.getSearchRes()
  }

  lastPage(){
    this.page = this.maxPage
    this.getSearchRes()
  }
}
