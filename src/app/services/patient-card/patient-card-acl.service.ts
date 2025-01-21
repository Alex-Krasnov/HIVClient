import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientCardAclModel } from '../../_interfaces/patient-card-acl.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientCardAclService {
  url: string = `${environment.apiUrl}/api/PatientCardAcl`;
  constructor(private http: HttpClient){}

  getData(id: number): Observable<PatientCardAclModel>{
      return this.http.get<PatientCardAclModel>(this.url+`?patientId=${id}`);
  };
}
