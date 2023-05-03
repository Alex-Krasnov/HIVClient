import { Injectable } from '@angular/core';
import { PatientCardDiagnosticConcomitantModel } from '../_interfaces/patient-card-diagnostic-concomitant.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientCardDiagnosticConcomitantService {
  url: string = 'https://localhost:5001/api/PatientCardDiagnosticConcomitant';
  constructor(private http: HttpClient){}

  getData(id: number): Observable<PatientCardDiagnosticConcomitantModel>{
      return this.http.get<PatientCardDiagnosticConcomitantModel>(this.url+`?patientId=${id}`);
  };
}
