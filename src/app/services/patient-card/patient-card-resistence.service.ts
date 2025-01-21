import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientCardResistenceModel } from '../../_interfaces/patient-card-resistence.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientCardResistenceService {
  url: string = `${environment.apiUrl}/api/PatientCardResistance`;
  constructor(private http: HttpClient){}

  getData(id: number): Observable<PatientCardResistenceModel>{
      return this.http.get<PatientCardResistenceModel>(this.url+`?patientId=${id}`);
  };
}
