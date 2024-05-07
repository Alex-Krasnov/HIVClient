import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientCardResistenceModel } from '../_interfaces/patient-card-resistence.model';
import { environment } from 'src/environments/environment';
import { ReferalAnalysis } from '../_interfaces/referal-analysis';

@Injectable({
  providedIn: 'root'
})
export class ReferalAnalysisIbService {
  url: string = `${environment.apiUrl}/api/ReferalAnalysisIb`;
  constructor(private http: HttpClient){}

  getData(): Observable<any>{
    return this.http.get<string[]>(this.url+'/GetDataForReferalAnalysisIb');
  };
  
  getFile(item: ReferalAnalysis): Observable<Blob> {
    return this.http.post(this.url+`/GetReferalAnalysisIb`, item, { responseType: 'blob'});
  };
}
