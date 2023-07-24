import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchChildListsModel } from '../_interfaces/search-child-lists.model';
import { SearchChildModel } from '../_interfaces/search-child.model';
import { Search } from '../_interfaces/search.model';

@Injectable({
  providedIn: 'root'
})
export class SearchChildService {
  url: string = 'https://localhost:5001/api/SearchChild';
  constructor(private http: HttpClient){}

  getLists(): Observable<SearchChildListsModel>{
      return this.http.get(this.url);
  };

  getData(item: SearchChildModel): Observable<Search>{
      return this.http.post<Search>(this.url+`/GetRes`, item);
  };
  
  downloadFile(item: SearchChildModel): Observable<Blob> {
    return this.http.post(this.url+`/GetRes`, item, { responseType: 'blob'});
  };
}
