import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewPatientService {

  url: string = 'https://localhost:5001/api/NewPatient';
  constructor(private http: HttpClient){}

  getData(): Observable<number>{
      return this.http.get<number>(this.url);
  };
}
