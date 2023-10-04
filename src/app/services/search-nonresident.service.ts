import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../_interfaces/search.model';
import { SearchNonresidentModelLists } from '../_interfaces/search-nonresident-lists.model';
import { SearchNonresidentModel } from '../_interfaces/search-nonresident.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchNonresidentService {
  url: string = `${environment.apiUrl}/api/SearchNonresident`;
  constructor(private http: HttpClient){}

  getLists(): Observable<SearchNonresidentModelLists>{
      return this.http.get(this.url);
  };

  getData(item: SearchNonresidentModel): Observable<Search>{
      return this.http.post<Search>(this.url+`/GetRes`, item);
  };
  
  downloadFile(item: SearchNonresidentModel): Observable<Blob> {
    return this.http.post(this.url+`/GetRes`, item, { responseType: 'blob'});
  };
}
