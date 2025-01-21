import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../../_interfaces/search.model';
import { SearchVisitModelLists } from '../../_interfaces/search-visit-lists.model';
import { SearchVisitModel } from '../../_interfaces/search-visit.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchVisitService {
  url: string = `${environment.apiUrl}/api/SearchVisit`;
  constructor(private http: HttpClient){}

  getLists(): Observable<SearchVisitModelLists>{
      return this.http.get(this.url);
  };

  getData(item: SearchVisitModel): Observable<Search>{
      return this.http.post<Search>(this.url+`/GetRes`, item);
  };
  
  downloadFile(item: SearchVisitModel): Observable<Blob> {
    return this.http.post(this.url+`/GetRes`, item, { responseType: 'blob'});
  };
}
