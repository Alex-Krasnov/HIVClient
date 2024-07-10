import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PatientCardTreatmentModel } from "../_interfaces/patient-card-treatment.model";
import { environment } from "src/environments/environment";

@Injectable()
export class PatientCardTreatmentService {
    url: string = `${environment.apiUrl}/api/PatientCardTreatment`;
    constructor(private http: HttpClient){}

    getData(id: number): Observable<PatientCardTreatmentModel>{
        return this.http.get<PatientCardTreatmentModel>(this.url+`?patientId=${id}`);
    };

    delCorrepIllness(patientId: number, name: number): Observable<unknown>{
        return this.http.delete(this.url+`/DelCorrepIllness?patientId=${patientId}&name=${name}`)
    };

    createCorrepIllness(patientId: number, name: string){
        return this.http.post(this.url+`/CreateCorrepIllness`, {
            PatientId: patientId, 
            CorrespIllnessName: name,
        })
    };

    updateCorrepIllness(patientId: number, name: string, nameOld: string){
            return this.http.post(this.url+`/UpdateCorrepIllness`, {
                PatientId: patientId, 
                CorrespIllnessName: name,
                CorrespIllnessNameOld: nameOld
            })
    };

    delHospResultRs(patientId: number, name: string, date: string): Observable<unknown>{
        return this.http.delete(this.url+`/DelHospResult?patientId=${patientId}&name=${name}&date=${date}`)
    };

    createHospResultRs(patientId: number, name: string, date: string, hospCourseName: string, dateHospOut: string, hospResultName: string){
        return this.http.post(this.url+`/CreateHospResult`, {
            PatientId: patientId, 
            LpuName: name,
            DateHospIn: date,
            HospCourseName: hospCourseName,
            DateHospOut: dateHospOut,
            HospResultName: hospResultName
        })
    };

    updateHospResultRs(patientId: number, name: string, date: string, hospCourseName: string, dateHospOut: string, hospResultName: string, nameOld: string, dateOld: string){
            return this.http.post(this.url+`/UpdateHospResult`, {
                PatientId: patientId, 
                LpuName: name,
                DateHospIn: date,
                HospCourseName: hospCourseName,
                DateHospOut: dateHospOut,
                HospResultName: hospResultName,
                LpuNameOld: nameOld,
                DateHospInOld: dateOld
            })
    };

    delCureSchemas(patientId: number, name: string, date: string): Observable<unknown>{
        return this.http.post(this.url+`/DelCureSchema`, {
            PatientId: patientId, 
            CureSchemaName: name,
            StartDate: date
        })
    };

    createCureSchemas(patientId: number, name: string, date: string, endDate: string, schemaCom: string, cureChangeName: string, protNum: string, rangeTherapyName: string, last: boolean){
        return this.http.post(this.url+`/CreateCureSchema`, {
            PatientId: patientId, 
            CureSchemaName: name,
            StartDate: date,
            EndDate: endDate,
            SchemaCom: schemaCom,
            CureChangeName: cureChangeName,
            ProtNum: protNum,
            RangeTherapyName: rangeTherapyName,
            Last: last
        })
    };

    updateCureSchemas(patientId: number, name: string, date: string, endDate: string, schemaCom: string, cureChangeName: string, protNum: string, rangeTherapyName: string, last: string, cureSchemaNameOld: string, startDateOld: string){
            return this.http.post(this.url+`/UpdateCureSchema`, {
                PatientId: patientId, 
                CureSchemaName: name,
                StartDate: date,
                EndDate: endDate,
                SchemaCom: schemaCom,
                CureChangeName: cureChangeName,
                ProtNum: protNum,
                RangeTherapyName: rangeTherapyName,
                Last: last,
                CureSchemaNameOld: cureSchemaNameOld,
                StartDateOld: startDateOld
            })
    };

    updatePatient(patientId: number, stageCom: string, com: string, invalid: string, hepBDate: Date, hepBDescr: string){
        return this.http.post(this.url+`/UpdatePatient`, {
            PatientId: patientId, 
            StageCom: stageCom,
            Com: com,
            Invalid: invalid,
            HepBDate: hepBDate,
            HepBDescr: hepBDescr
        })
    };

    delHepC(id: number): Observable<unknown>{
        return this.http.delete(this.url+`/DelHepC?id=${id}`)
    };
    
    createHepC(patientId: number, dateStart: Date, dateEnd: Date, descr: string){
        return this.http.post(this.url+`/CreateHepC`, {
            patientId: patientId,
            dateStart: dateStart,
            dateEnd: dateEnd,
            descr: descr
        })
    };
    
    updateHepC(id: number, patientId: number, dateStart: Date, dateEnd: Date, descr: string){
        return this.http.post(this.url+`/UpdateHepC`, {
            id: id,
            patientId: patientId,
            dateStart: dateStart,
            dateEnd: dateEnd,
            descr: descr
        })
    };
}