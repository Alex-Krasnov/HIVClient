import { Injectable } from '@angular/core';
import { PatientCardChildModel } from '../../_interfaces/patient-card-child.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pcChild } from '../../_interfaces/pc-child.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientCardChildService {
  url: string = `${environment.apiUrl}/api/PatientCardChild`;
  constructor(private http: HttpClient){}

  getData(id: number): Observable<PatientCardChildModel>{
      return this.http.get<PatientCardChildModel>(this.url+`?patientId=${id}`);
  };

  updatePatient(patient: pcChild){
    return this.http.post(this.url+`/UpdatePatient`, {
      patientId: patient.patientId,
      familyType: patient.familyType,
      mId: patient.mId,
      fId: patient.fId,
      firstCheckDate: patient.firstCheckDate,
      childPlace: patient.childPlace,
      breastMonth: patient.breastMonth,
      childPhp: patient.childPhp,
      materHome: patient.materHome,
      childDescr: patient.childDescr,
      growth: patient.growth,
      weight: patient.weight,
      forma309: patient.forma309,
      lastCareDate: patient.lastCareDate,
      communicationParentDate: patient.communicationParentDate,
      callingDistrictSpecDate: patient.callingDistrictSpecDate,
      refusalPhp: patient.refusalPhp,
      refusalResearch: patient.refusalResearch,
      refusalTherapy: patient.refusalTherapy
    })
  };
}
