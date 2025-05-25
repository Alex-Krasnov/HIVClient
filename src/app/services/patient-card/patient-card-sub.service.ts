import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PatientCardSubModel } from "src/app/_interfaces/patient-card-sub.model";

@Injectable({
  providedIn: 'root'
})
export class PatientCardSubService {
  url: string = `${environment.apiUrl}/api/PatientCardSub`;
  constructor(private http: HttpClient){}

  GetFio(id: number): Observable<PatientCardSubModel>{
      return this.http.get<PatientCardSubModel>(this.url+`/GetFio?patientId=${id}`);
  };
}
