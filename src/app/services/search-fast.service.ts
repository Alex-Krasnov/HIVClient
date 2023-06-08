import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../_interfaces/search.model';
import { SearchFastFormModel } from '../_interfaces/search-fast-form.model';

@Injectable({
  providedIn: 'root'
})
export class SearchFastService {
  url: string = 'https://localhost:5001/api/SearchFast';
  constructor(private http: HttpClient){}

  getData(item: SearchFastFormModel): Observable<Search>{
      return this.http.post<Search>(this.url, item);
  };
}
