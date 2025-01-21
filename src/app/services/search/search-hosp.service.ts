import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../../_interfaces/search.model';
import { SearchHospModelLists } from '../../_interfaces/search-hosp-lists.model';
import { SearchHospModel } from '../../_interfaces/search-hosp.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchHospService {
  url: string = `${environment.apiUrl}/api/SearchHosp`;
  constructor(private http: HttpClient){}

  getLists(): Observable<SearchHospModelLists>{
      return this.http.get(this.url);
  };

  getData(item: SearchHospModel): Observable<Search>{
      return this.http.post<Search>(this.url+`/GetRes`, item);
  };
  
  downloadFile(item: SearchHospModel): Observable<Blob> {
    return this.http.post(this.url+`/GetRes`, item, { responseType: 'blob'});
  };
}
