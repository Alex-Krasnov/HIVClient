import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PatientCardTreatmentModel } from "../../_interfaces/patient-card-treatment.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PatientCardSubService {
  url: string = `${environment.apiUrl}/api/PatientCardSub`;
  constructor(private http: HttpClient){}

  GetFio(id: number): Observable<PatientCardTreatmentModel>{
      return this.http.get<PatientCardTreatmentModel>(this.url+`/GetFio?patientId=${id}`);
  };
}
