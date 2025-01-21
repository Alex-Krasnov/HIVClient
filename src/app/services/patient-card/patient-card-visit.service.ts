import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";
import { PatientCardVisitModel } from "../../_interfaces/patient-card-visit.model";
import { environment } from "src/environments/environment";

@Injectable()
export class PatientCardVisitService {
    url: string = `${environment.apiUrl}/api/PatientCardVisit`;
    constructor(private http: HttpClient){}

    getData(id: number): Observable<PatientCardVisitModel>{
        return this.http.get<PatientCardVisitModel>(this.url+`?patientId=${id}`);
    };

    delCheckOuts(patientId: number, date: string, spec: string): Observable<unknown>{
        return this.http.delete(this.url+`/DelCheckOut?patientId=${patientId}&date=${date}&spec=${spec}`)
    };

    createCheckOuts(patientId: number, checkDate: string, specName: string, checkDateNetx: string, checkDocName: string){
        return this.http.post(this.url+`/CreateCheckOut`, {
            patientId: patientId,
            checkDate: checkDate,
            specName: specName,
            checkDateNetx: checkDateNetx,
            checkDocName: checkDocName
        })
    };

    updateCheckOuts(patientId: number, checkDate: string, specName: string, checkDateNetx: string, checkDocName: string, checkDateOld: string, specNameOld: string, checkDocNameOld: string){
            return this.http.post(this.url+`/UpdateCheckOut`, {
                patientId: patientId,
                checkDate: checkDate,
                specName: specName,
                checkDateNetx: checkDateNetx,
                checkDocName: checkDocName,
                checkDateOld: checkDateOld,
                specNameOld: specNameOld,
                checkDocNameOld: checkDocNameOld
            })
    };

    updateRegistry(patientId: number, regDate: string, regCab: string, regTime: string, regDoc: string, regCom: string, regCheck: string, regDateOld: string, regCabOld: string){
        return this.http.post(this.url+`/UpdateRegistry`, {
            patientId: patientId,
            regDate: regDate,
            regCab: regCab,
            regTime: regTime,
            regDoc: regDoc,
            regCom: regCom,
            regCheck: regCheck,
            regDateOld: regDateOld,
            regCabOld: regCabOld
        })
    };

    delRegistry(patientId: number, date: string, cab: string): Observable<unknown>{
        return this.http.delete(this.url+`/DelRegistry?patientId=${patientId}&date=${date}&cab=${cab}`)
    };
}