import { Injectable } from '@angular/core';
import { PatientCardDiagnosticConcomitantModel } from '../_interfaces/patient-card-diagnostic-concomitant.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientCardDiagnosticConcomitantService {
  url: string = `${environment.apiUrl}/api/PatientCardDiagnosticConcomitant`;
  constructor(private http: HttpClient){}

  getData(id: number): Observable<PatientCardDiagnosticConcomitantModel>{
      return this.http.get<PatientCardDiagnosticConcomitantModel>(this.url+`?patientId=${id}`);
  };
}
