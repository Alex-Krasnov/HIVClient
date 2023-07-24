import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchMainInfModelLists } from '../_interfaces/search-main-inf-lists.model';
import { Search } from '../_interfaces/search.model';
import { SearchMainInfModel } from '../_interfaces/search-main-inf.model';

@Injectable({
  providedIn: 'root'
})
export class SearchMainInfService {
  url: string = 'https://localhost:5001/api/SearchMainInf';
  constructor(private http: HttpClient){}

  getLists(): Observable<SearchMainInfModelLists>{
      return this.http.get(this.url);
  };

  getData(item: SearchMainInfModel): Observable<Search>{
      return this.http.post<Search>(this.url+`/GetRes`, item);
  };
  
  downloadFile(item: SearchMainInfModel): Observable<Blob> {
    return this.http.post(this.url+`/GetRes`, item, { responseType: 'blob'});
  }
}
