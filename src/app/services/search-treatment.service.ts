import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../_interfaces/search.model';
import { SearchTreatmentListsModel } from '../_interfaces/search-treatment-lists.model';
import { SearchTreatmentModel } from '../_interfaces/search-treatment.model';

@Injectable({
  providedIn: 'root'
})
export class SearchTreatmentService {
  url: string = 'https://localhost:5001/api/SearchTreatment';
  constructor(private http: HttpClient){}

  getLists(): Observable<SearchTreatmentListsModel>{
      return this.http.get(this.url);
  };

  getData(item: SearchTreatmentModel): Observable<Search>{
      return this.http.post<Search>(this.url+`/GetRes`, item);
  };
}
