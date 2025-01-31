import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../../_interfaces/search.model';
import { SearchPregnantListsModel } from '../../_interfaces/search-pregnant-lists.model';
import { SearchPregnantModel } from '../../_interfaces/search-pregnant.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchPregnantService {
  url: string = `${environment.apiUrl}/api/SearchPregnant`;
  constructor(private http: HttpClient){}

  getLists(): Observable<SearchPregnantListsModel>{
      return this.http.get(this.url);
  };

  getData(item: SearchPregnantModel): Observable<Search>{
      return this.http.post<Search>(this.url+`/GetRes`, item);
  };
  
  downloadFile(item: SearchPregnantModel): Observable<Blob> {
    return this.http.post(this.url+`/GetRes`, item, { responseType: 'blob'});
  };
}