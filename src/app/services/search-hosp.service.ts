import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../_interfaces/search.model';
import { SearchHospModelLists } from '../_interfaces/search-hosp-lists.model';
import { SearchHospModel } from '../_interfaces/search-hosp.model';

@Injectable({
  providedIn: 'root'
})
export class SearchHospService {
  url: string = 'https://localhost:5001/api/SearchHosp';
  constructor(private http: HttpClient){}

  getLists(): Observable<SearchHospModelLists>{
      return this.http.get(this.url);
  };

  getData(item: SearchHospModel): Observable<Search>{
      return this.http.post<Search>(this.url+`/GetRes`, item);
  };
}
