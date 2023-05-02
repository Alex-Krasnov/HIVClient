import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientCardDiagnosticsModel } from '../_interfaces/patient-card-diagnostics.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientCardDiagnosticsService {
  url: string = 'https://localhost:5001/api/PatientCardDiagnostics';
  constructor(private http: HttpClient){}

  getData(id: number): Observable<PatientCardDiagnosticsModel>{
      return this.http.get<PatientCardDiagnosticsModel>(this.url+`?patientId=${id}`);
  };
}
