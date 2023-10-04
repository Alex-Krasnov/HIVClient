import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewPatientService {

  url: string = `${environment.apiUrl}/api/NewPatient`;
  constructor(private http: HttpClient){}

  getData(): Observable<number>{
      return this.http.get<number>(this.url);
  };
}
