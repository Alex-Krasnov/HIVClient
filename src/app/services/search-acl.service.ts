import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../_interfaces/search.model';
import { SearchAclListsModel } from '../_interfaces/search-acl-lists.model';
import { SearchAclModel } from '../_interfaces/search-acl.model';

@Injectable({
  providedIn: 'root'
})
export class SearchAclService {

  url: string = 'https://localhost:5001/api/SearchAcl';
  constructor(private http: HttpClient){}

  getLists(): Observable<SearchAclListsModel>{
      return this.http.get(this.url);
  };

  getData(item: SearchAclModel): Observable<Search>{
      return this.http.post<Search>(this.url+`/GetRes`, item);
  };
}