import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../_interfaces/search.model';
import { SearchCovidListsModel } from '../_interfaces/search-covid-lists.model';
import { SearchCovidModel } from '../_interfaces/search-covid.model';

@Injectable({
  providedIn: 'root'
})
export class SearchCovidService {
  url: string = 'https://localhost:5001/api/SearchCovid';
  constructor(private http: HttpClient){}

  getLists(): Observable<SearchCovidListsModel>{
      return this.http.get(this.url);
  };

  getData(item: SearchCovidModel): Observable<Search>{
      return this.http.post<Search>(this.url+`/GetRes`, item);
  };
}
