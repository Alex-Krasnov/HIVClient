import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TalonModel } from '../_interfaces/talon.model';

@Injectable({
  providedIn: 'root'
})
export class TalonService {
  url: string = 'https://localhost:5001/api/Talon';
  constructor(private http: HttpClient){}

  getData(id: string, date: string, cab: string): Observable<TalonModel>{
      return this.http.get<TalonModel>(this.url+`?patientId=${id}&regDate=${date}&regCab=${cab}`);
  };

  createTalon(patientId: string, regCab: string, regDate: string, talonNum: number, field01: string, field12: string, 
    field13: string, field14: string, field21: string, field22: string, field24: string, field25: string, field35: string, field36: string){
    return this.http.post(this.url+`/CreateTalon`, {
      patientId: patientId,
      regCab: regCab,
      regDate:regDate,
      talonNum:talonNum,
      field01:field01,
      field12:field12,
      field13:field13,
      field14:field14,
      field21:field21,
      field22:field22,
      field24:field24,
      field25:field25,
      field35:field35,
      field36:field36
    })
};

}
