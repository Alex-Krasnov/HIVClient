import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImportKorvetService {
  url: string = `${environment.apiUrl}/api/ImportKorvet`;
  constructor(private http: HttpClient){}

  getFinSource(): Observable<string[]>{
    return this.http.get<string[]>(this.url);
  };

  sendFile( formData: FormData ): Observable<Blob> {
    return this.http.post(this.url+`/SetFile`, formData, { responseType: 'blob' });
  };

  // downloadFile(item: SearchMainInfModel): Observable<Blob> {
  //   return this.http.post(this.url+`/GetRes`, item, { responseType: 'blob'});
  // };
}
