import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PatientCardJailModel } from "../_interfaces/patient-card-jail.model";

@Injectable({
  providedIn: 'root'
})
export class PatientCardJailService {
  url: string = 'https://localhost:5001/api/PatientCardJail';
  constructor(private http: HttpClient){}

  getData(id: number): Observable<PatientCardJailModel>{
      return this.http.get<PatientCardJailModel>(this.url+`?patientId=${id}`);
  };

  delJail(patientId: number, dateStart: string, dateEnd: string): Observable<unknown>{
      return this.http.delete(this.url+`/DelJail?patientId=${patientId}&dateStart=${dateStart}&dateEnd=${dateEnd}`)
  };

  createJail(patientId: number, jailName: string, jailLeavName: string, jailStart: string, jailEnd: string){
      return this.http.post(this.url+`/CreateJail`, {
        patientId: patientId,
        jailName: jailName,
        jailLeavName: jailLeavName,
        jailStart: jailStart,
        jailEnd: jailEnd
      })
  };

  updateJail(patientId: number, jailName: string, jailLeavName: string, jailStart: string, jailEnd: string, jailStartOld: string, jailEndOld: string){
          return this.http.post(this.url+`/UpdateJail`, {
            patientId: patientId,
            jailName: jailName,
            jailLeavName: jailLeavName,
            jailStart: jailStart,
            jailEnd: jailEnd,
            jailStartOld: jailStartOld,
            jailEndOld: jailEndOld
          })
  };

  updatePatient(patientId: number, jailName: string, jailOffRegion: string, jailOffDate: string){
    return this.http.post(this.url+`/UpdatePatient`, {
      patientId: patientId,
      jailName: jailName,
      jailOffRegion: jailOffRegion,
      jailOffDate: jailOffDate
    })
  };
}
