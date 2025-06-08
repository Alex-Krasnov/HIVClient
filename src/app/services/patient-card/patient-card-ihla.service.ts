import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AnalysisIhla, PatientCardIhlaModel } from "src/app/_interfaces/patient-card-ihla.model";

@Injectable({
  providedIn: 'root'
})
export class PatientCardIhlaService {
  url: string = `${environment.apiUrl}/api/IHLAAnalysis`;
  constructor(private http: HttpClient){}

  getData(id: number): Observable<PatientCardIhlaModel>{
    return this.http.get<PatientCardIhlaModel>(this.url+`?patientId=${id}`);
  };

  del(id: number): Observable<unknown>{
    return this.http.delete(this.url+`/Delete?id=${id}`)
  };

  create(patientId: number, date: Date, result: string): Observable<AnalysisIhla>{
    return this.http.post<AnalysisIhla>(this.url+`/Create`, {
        patientId: patientId,
        analysisDate: date,
        result: result
    })
  };

  update(id: number, patientId: number, date: Date, result: string): Observable<AnalysisIhla>{
    return this.http.post<AnalysisIhla>(this.url+`/Update`, {
        id: id, 
        patientId: patientId,
        analysisDate: date,
        result: result
    })
  };
}
