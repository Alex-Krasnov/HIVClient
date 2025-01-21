import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeachRegistryService {

  url: string = `${environment.apiUrl}/api/SearchRegistry`;
  constructor(private http: HttpClient){}

  getLists(): Observable<string[]>{
      return this.http.get<string[]>(this.url);
  };
  
  downloadFile(doc: string, date: string): Observable<Blob> {
    return this.http.post(this.url+`/GetRes`, {doctor: doc, date: date}, { responseType: 'blob'});
  };
}
