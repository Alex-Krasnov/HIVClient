import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../_interfaces/search.model';
import { SearchAnalyseListsModel } from '../_interfaces/search-analyse-lists.model';
import { SearchAnalyseModel } from '../_interfaces/search-analyse.model';

@Injectable({
  providedIn: 'root'
})
export class SearchAnalysisService {
  url: string = 'https://localhost:5001/api/SearchAnalyse';
  constructor(private http: HttpClient){}

  getLists(): Observable<SearchAnalyseListsModel>{
      return this.http.get(this.url);
  };

  getData(item: SearchAnalyseModel): Observable<Search>{
      return this.http.post<Search>(this.url+`/GetRes`, item);
  };
}
