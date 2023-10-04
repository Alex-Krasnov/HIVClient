import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientCardPregnantModel } from '../_interfaces/patient-card-pregnant.model';
import { Observable } from 'rxjs';
import { pcPregM } from '../_interfaces/pc-preg-m.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientCardPregnantService {
  url: string = `${environment.apiUrl}/api/PatientCardPregnant`;
  constructor(private http: HttpClient){}

  getData(id: number): Observable<PatientCardPregnantModel>{
      return this.http.get<PatientCardPregnantModel>(this.url+`?patientId=${id}`);
  };

  delPregM(patientId: number, pregId: number): Observable<unknown>{
      return this.http.delete(this.url+`/DelPregM?patientId=${patientId}&pregId=${pregId}`)
  };

  createPregM(pregM: pcPregM){
      return this.http.post(this.url+`/CreatePregM`, {
          patientId: pregM.patientId,
          pregId: pregM.pregId,
          pwCheck: pregM.pwCheck,
          pwMonth: pregM.pwMonth,
          pregDate: pregM.pregDate,
          childBirthDate: pregM.childBirthDate,
          birthType: pregM.birthType,
          childCount: pregM.childCount,
          childId: pregM.childId,
          startMonth: pregM.startMonth,
          childFamilyName: pregM.childFamilyName,
          childFirstName: pregM.childFirstName,
          childThirdName: pregM.childThirdName,
          pregDescr: pregM.pregDescr,
          phpSchema1: pregM.phpSchema1,
          phpSchema2: pregM.phpSchema2,
          phpSchema3: pregM.phpSchema3
      })
  };

  updatePregM(pregM: pcPregM){
          return this.http.post(this.url+`/UpdatePregM`, {
            patientId: pregM.patientId,
            pregId: pregM.pregId,
            oldPregId: pregM.pregIdOld,
            pwCheck: pregM.pwCheck,
            pwMonth: pregM.pwMonth,
            pregDate: pregM.pregDate,
            childBirthDate: pregM.childBirthDate,
            birthType: pregM.birthType,
            childCount: pregM.childCount,
            childId: pregM.childId,
            startMonth: pregM.startMonth,
            childFamilyName: pregM.childFamilyName,
            childFirstName: pregM.childFirstName,
            childThirdName: pregM.childThirdName,
            pregDescr: pregM.pregDescr,
            phpSchema1: pregM.phpSchema1,
            phpSchema2: pregM.phpSchema2,
            phpSchema3: pregM.phpSchema3
          })
  };

  updatePatient(patientId: number, pregCheck: string, pregMonth: number){
    return this.http.post(this.url+`/UpdatePatient`, {
      patientId: patientId,
      pregCheck: pregCheck,
      pregMonth: pregMonth
    })
  };
}
