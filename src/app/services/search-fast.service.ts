import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../_interfaces/search.model';
import { SearchFastFormModel } from '../_interfaces/search-fast-form.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchFastService {
  url: string = `${environment.apiUrl}/api/SearchFast`;
  constructor(private http: HttpClient){}

  getData(item: SearchFastFormModel): Observable<Search>{
      return this.http.post<Search>(this.url, item);
  };
}
