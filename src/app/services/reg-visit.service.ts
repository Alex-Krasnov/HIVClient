import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegVisit } from '../_interfaces/reg-visit.model';

@Injectable({
  providedIn: 'root'
})
export class RegVisitService {
  url: string = 'https://localhost:5001/api/RegVisit';
  constructor(private http: HttpClient){}

  getData(): Observable<RegVisit>{
      return this.http.get<RegVisit>(this.url+`/GetForm`);
  };

  getUnregDate(patientId: number, docName: string, cabName: string, startDate: string, endDate: string){
    return this.http.post(this.url+`/GetUnregDate`, {
        patientId: patientId,
        docName: docName,
        cabName: cabName,
        startDate: startDate,
        endDate: endDate
    })
  };

  getUnregTime(patientId: number, docId: number, cabId: number, date: string){
    return this.http.post(this.url+`/GetUnregTime`, {
        patientId: patientId,
        docId: docId,
        cabId: cabId,
        date: date
    })
  };

  setVisit(patientId: number, docId: number, cabId: number, date: Date, timeName: string){
    return this.http.post(this.url+`/SetVisit`, {
        patientId: patientId,
        docId: docId,
        cabId: cabId,
        date: date,
        timeName: timeName
    })
  };
}
