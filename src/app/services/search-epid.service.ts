import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../_interfaces/search.model';
import { SearchEpidListsModel } from '../_interfaces/search-epid-lists.model';
import { SearchEpidModel } from '../_interfaces/search-epid.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchEpidService {
  url: string = `${environment.apiUrl}/api/SearchEpid`;
  constructor(private http: HttpClient){}

  getLists(): Observable<SearchEpidListsModel>{
      return this.http.get(this.url);
  };

  getData(item: SearchEpidModel): Observable<Search>{
      return this.http.post<Search>(this.url+`/GetRes`, item);
  };
  
  downloadFile(item: SearchEpidModel): Observable<Blob> {
    return this.http.post(this.url+`/GetRes`, item, { responseType: 'blob'});
  };
}
