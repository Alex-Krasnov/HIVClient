import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PatientCardCovidModel } from "../_interfaces/patient-card-covid.model";
import { Covid } from "../_interfaces/covid.model";

@Injectable({
  providedIn: 'root'
})
export class PatientCardCovidService {
  url: string = 'https://localhost:5001/api/PatientCardCovid';
  constructor(private http: HttpClient){}

  getData(id: number): Observable<PatientCardCovidModel>{
      return this.http.get<PatientCardCovidModel>(this.url+`?patientId=${id}`);
  };

  delOtherDiag(id: number): Observable<unknown>{
      return this.http.delete(this.url+`/DelOtherDiag?id=${id}`)
  };

  createOtherDiag(patientId: number, nameShort: string, comm: string){
      return this.http.post(this.url+`/CreateOtherDiag`, {
          patientId: patientId,
          nameShort: nameShort,
          comm: comm
      })
  };

  updateOtherDiag(id: number, nameShort: string, comm: string){
    return this.http.post(this.url+`/UpdateOtherDiag`, {
      id: id,
      nameShort: nameShort,
      comm: comm
    })
  };

  delPatDiag(id: number): Observable<unknown>{
      return this.http.delete(this.url+`/DelPatDiag?id=${id}`)
  };

  createPatDiag(patientId: number, nameShort: string, comm: string){
      return this.http.post(this.url+`/CreatePatDiag`, {
          patientId: patientId,
          nameShort: nameShort,
          comm: comm
      })
  };

  updatePatDiag(id: number, nameShort: string, comm: string){
    return this.http.post(this.url+`/UpdatePatDiag`, {
      id: id,
      nameShort: nameShort,
      comm: comm
    })
  };

  delCovid(id: number): Observable<unknown>{
      return this.http.delete(this.url+`/DelCovid?id=${id}`)
  };

  createCovid(item: Covid){
      return this.http.post(this.url+`/CreateCovid`, {
        patientId: item.patientId,
        periodDesDate: item.periodDesDate,
        positiveResCovidDate: item.positiveResCovidDate,
        negativeResCovidDate: item.negativeResCovidDate,
        hospDate: item.hospDate,
        dischargeDate: item.dischargeDate,
        outPatTreat: item.outPatTreat,
        deathCovid: item.deathCovid,
        orit: item.orit,
        oxygen: item.oxygen,
        avl: item.avl,
        arterHyper: item.arterHyper,
        deabetes: item.deabetes,
        coronarySynd: item.coronarySynd,
        hobl: item.hobl,
        bronhAstma: item.bronhAstma,
        cancer: item.cancer,
        kidneyDes: item.kidneyDes,
        outcomeHosp: item.outcomeHosp,
        clinVarCovid: item.clinVarCovid,
        severityCovid: item.severityCovid,
        covidMKB10Short: item.covidMKB10Short,
        covidMKB10Long: item.covidMKB10Long,
        tubercuosisShort: item.tubercuosisShort,
        tubercuosisLong: item.tubercuosisLong,
        pneumoniaShort: item.pneumoniaShort,
        pneumoniaLong: item.pneumoniaLong,
        typeAvl: item.typeAvl,
        commitment: item.commitment,
        comm: item.comm
      })
  };

  updateCovid(item: Covid){
    return this.http.post(this.url+`/UpdateCovid`, {
        idCovid: item.idCovid,
        periodDesDate: item.periodDesDate,
        positiveResCovidDate: item.positiveResCovidDate,
        negativeResCovidDate: item.negativeResCovidDate,
        hospDate: item.hospDate,
        dischargeDate: item.dischargeDate,
        outPatTreat: item.outPatTreat,
        deathCovid: item.deathCovid,
        orit: item.orit,
        oxygen: item.oxygen,
        avl: item.avl,
        arterHyper: item.arterHyper,
        deabetes: item.deabetes,
        coronarySynd: item.coronarySynd,
        hobl: item.hobl,
        bronhAstma: item.bronhAstma,
        cancer: item.cancer,
        kidneyDes: item.kidneyDes,
        outcomeHosp: item.outcomeHosp,
        clinVarCovid: item.clinVarCovid,
        severityCovid: item.severityCovid,
        covidMKB10Short: item.covidMKB10Short,
        covidMKB10Long: item.covidMKB10Long,
        tubercuosisShort: item.tubercuosisShort,
        tubercuosisLong: item.tubercuosisLong,
        pneumoniaShort: item.pneumoniaShort,
        pneumoniaLong: item.pneumoniaLong,
        typeAvl: item.typeAvl,
        commitment: item.commitment,
        comm: item.comm
    })
  };
}
