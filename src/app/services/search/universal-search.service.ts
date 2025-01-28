import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from 'src/app/_interfaces/search.model';
import { BaseSearchModel } from 'src/app/base/models/base-search.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UniversalSearchService<T extends BaseSearchModel> {
  constructor(private http: HttpClient) { }

  getLists(item: T): Observable<Object>{
    return this.http.get(this.getUrl(item));
  };

  getData(item: T): Observable<Search>{
    return this.http.post<Search>(this.getUrl(item)+`/GetRes`, item);
  };
  
  downloadFile(item: T): Observable<Blob> {
    return this.http.post(this.getUrl(item)+`/GetRes`, item, { responseType: 'blob'});
  };

  private getUrl(modelClass: T): string {
    return `${environment.apiUrl}/api/${modelClass.urlSegment()}`;
  }
}
