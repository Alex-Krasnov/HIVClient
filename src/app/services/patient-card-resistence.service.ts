import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientCardResistenceModel } from '../_interfaces/patient-card-resistence.model';

@Injectable({
  providedIn: 'root'
})
export class PatientCardResistenceService {
  url: string = 'https://localhost:5001/api/PatientCardResistance';
  constructor(private http: HttpClient){}

  getData(id: number): Observable<PatientCardResistenceModel>{
      return this.http.get<PatientCardResistenceModel>(this.url+`?patientId=${id}`);
  };
}
