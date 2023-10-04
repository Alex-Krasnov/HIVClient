import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../_interfaces/search.model';
import { SearchAnalyseListsModel } from '../_interfaces/search-analyse-lists.model';
import { SearchAnalyseModel } from '../_interfaces/search-analyse.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchAnalysisService {
  url: string = `${environment.apiUrl}/api/SearchAnalyse`;
  constructor(private http: HttpClient){}

  getLists(): Observable<SearchAnalyseListsModel>{
      return this.http.get(this.url);
  };

  getData(item: SearchAnalyseModel): Observable<Search>{
      return this.http.post<Search>(this.url+`/GetRes`, item);
  };
  
  downloadFile(item: SearchAnalyseModel): Observable<Blob> {
    return this.http.post(this.url+`/GetRes`, item, { responseType: 'blob'});
  };
}
