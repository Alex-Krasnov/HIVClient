import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientCardResistenceModel } from '../_interfaces/patient-card-resistence.model';
import { environment } from 'src/environments/environment';
import { ReferalAnalysis } from '../_interfaces/referal-analysis';

@Injectable({
  providedIn: 'root'
})
export class ReferalAnalysisService {
  url: string = `${environment.apiUrl}/api/ReferalAnalysis`;
  constructor(private http: HttpClient){}

  getData(): Observable<any>{
    return this.http.get<PatientCardResistenceModel>(this.url+'/GetDataForReferalAnalysis');
  };
  
  getFile(item: ReferalAnalysis): Observable<Blob> {
    return this.http.post(this.url+`/GetReferalAnalysis`, item, { responseType: 'blob'});
  };
}
