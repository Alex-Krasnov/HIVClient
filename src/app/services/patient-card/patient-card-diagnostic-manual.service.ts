import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PatientCardDiagnosticManualModel } from "../../_interfaces/patient-card-diagnostic-manual.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PatientCardDiagnosticManualService {
  url: string = `${environment.apiUrl}/api/PatientCardDiagnosticManual`;
  constructor(private http: HttpClient){}

  getData(id: number): Observable<PatientCardDiagnosticManualModel>{
    return this.http.get<PatientCardDiagnosticManualModel>(this.url+`?patientId=${id}`);
  };

  delManual(id: number, date: string, type: string): Observable<unknown>{
    return this.http.delete(this.url+`/DelMaual?id=${id}&date=${date}&type=${type}`)
  };

  createManual(patientId: number, date: string, type: string, result: number, resultDescr: string){
    return this.http.post(this.url+`/CreateMaual`, {
        patientId: patientId,
        date: date,
        type: type,
        result: result,
        resultDescr: resultDescr
    })
  };

  updateManual(patientId: number, date: string, type: string, result: number, resultDescr: string, dateOld: string){
    return this.http.post(this.url+`/UpdateMaual`, {
      patientId: patientId,
      date: date,
      type: type,
      result: result,
      resultDescr: resultDescr,
      dateOld: dateOld
    })
  };
}
