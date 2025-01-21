import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PatientCardEpidModel } from "../../_interfaces/patient-card-epid.model";
import { pcEpid } from "../../_interfaces/pc-epid.model";
import { environment } from "src/environments/environment";

@Injectable()
export class PatientCardEpidService {
    url: string = `${environment.apiUrl}/api/PatientCardEpid`;
    constructor(private http: HttpClient){}

    getData(id: number): Observable<PatientCardEpidModel>{
        return this.http.get<PatientCardEpidModel>(this.url+`?patientId=${id}`);
    };

    getFio(id: number): Observable<any>{
        return this.http.get<any>(this.url+`/GetFio?patientId=${id}`);
    };

    delContacts(patientId: number, contactId: number): Observable<unknown>{
        return this.http.delete(this.url+`/DelContact?patientId=${patientId}&contactId=${contactId}`)
    };

    createContacts(patientId: number, contactId: number, infCourse: string, type: number){
        return this.http.post(this.url+`/CreateContact`, {
            patientId: patientId,
            contactId: contactId,
            infectCourseName: infCourse,
            type: type
        })
    };

    updateContacts(patientId: number, contactId: number, infCourse: string, type: number, contactIdOld:number){
            return this.http.post(this.url+`/UpdateContact`, {
                patientId: patientId,
                contactId: contactId,
                infectCourseName: infCourse,
                type: type,
                contactIdOld: contactIdOld
            })
    };

    delChemsex(id: number): Observable<unknown>{
        return this.http.delete(this.url+`/DelChemsex?id=${id}`)
    };

    createChemsex(patientId: number, ynName: string, drugName: string, contactTypeName: number){
        return this.http.post(this.url+`/CreateChemsex`, {
            patientId: patientId,
            ynName: ynName,
            drugName: drugName,
            contactTypeName: contactTypeName
        })
    };

    updateChemsex( ynName: string, drugName: string, contactTypeName: number, drugId: number){
            return this.http.post(this.url+`/UpdateChemsex`, {
                ynName: ynName,
                drugName: drugName,
                contactTypeName: contactTypeName,
                drugId: drugId
            })
    };

    delPavInj(id: number): Observable<unknown>{
        return this.http.delete(this.url+`/DelPavInj?id=${id}`)
    };

    createPavInj(patientId: number, ynName: string, drugName: string, dateStart: string, dateEnd: string){
        return this.http.post(this.url+`/CreatePavInj`, {
            patientId: patientId,
            ynName: ynName,
            drugName: drugName,
            dateStart: dateStart,
            dateEnd: dateEnd
        })
    };

    updatePavInj( ynName: string, drugName: string, dateStart: string, dateEnd: string, drugId: number){
            return this.http.post(this.url+`/UpdatePavInj`, {
                ynName: ynName,
                drugName: drugName,
                dateStart: dateStart,
                dateEnd: dateEnd,
                drugId: drugId
            })
    };

    delPavNotInj(id: number): Observable<unknown>{
        return this.http.delete(this.url+`/DelPavNotInj?id=${id}`)
    };

    createPavNotInj(patientId: number, ynName: string, drugName: string, dateStart: string, dateEnd: string){
        return this.http.post(this.url+`/CreatePavNotInj`, {
            patientId: patientId,
            ynName: ynName,
            drugName: drugName,
            dateStart: dateStart,
            dateEnd: dateEnd
        })
    };

    updatePavNotInj( ynName: string, drugName: string, dateStart: string, dateEnd: string, drugId: number){
            return this.http.post(this.url+`/UpdatePavNotInj`, {
                ynName: ynName,
                drugName: drugName,
                dateStart: dateStart,
                dateEnd: dateEnd,
                drugId: drugId
            })
    };

    delCovidVac(id: number): Observable<unknown>{
        return this.http.delete(this.url+`/DelCovidVac?id=${id}`)
    };

    createCovidVac(patientId: number, dVac1: string, dVac2: string, vacName: string){
        return this.http.post(this.url+`/CreateCovidVac`, {
            patientId: patientId,
            dVac1: dVac1,
            dVac2: dVac2,
            vacName: vacName
        })
    };

    updateCovidVac(vacName: string, dVac1: string, dVac2: string, vacId: number){
            return this.http.post(this.url+`/UpdateCovidVac`, {
                DVac1: dVac1,
                DVac2: dVac2,
                VacName: vacName,
                vacId: vacId
            })
    };

    createCovid(patientId: number, dPositivRes: string, dNegativeRes: string, covidMKB: string){
        return this.http.post(this.url+`/CreateCovid`, {
            patientId: patientId,
            dPositivRes: dPositivRes,
            dNegativeRes: dNegativeRes,
            covidMKB: covidMKB
        })
    };

    updateCovid(covidMkb10: string, dPositivRes: string, dNegativeRes: string, covidId: number){
            return this.http.post(this.url+`/UpdateCovid`, {
                dPositivRes: dPositivRes,
                dNegativeRes: dNegativeRes,
                covidMkb: covidMkb10,
                covidId: covidId
            })
    };

    updatePatient(patient: pcEpid){
        return this.http.post(this.url+`/UpdatePatient`, patient)
    };

    delEpidChild(id: number): Observable<unknown>{
        return this.http.delete(this.url+`/DelEpidChild?id=${id}`)
    };

    createEpidChild(id: number, patientId: number, sexName: string, childFamilyName: string, childFirstName: string, childThirdName: string, birthDate: string, exam: boolean){
        return this.http.post(this.url+`/CreateEpidChild`, {
            id: id,
            patientId: patientId,
            sexName: sexName,
            childFamilyName: childFamilyName,
            childFirstName: childFirstName,
            childThirdName: childThirdName,
            birthDate: birthDate,
            exam: exam
        })
    };
    
    updateEpidChild(id: number, patientId: number, sexName: string, childFamilyName: string, childFirstName: string, childThirdName: string, birthDate: string, exam: boolean){
        return this.http.post(this.url+`/UpdateEpidChild`, {
            id: id,
            patientId: patientId,
            sexName: sexName,
            childFamilyName: childFamilyName,
            childFirstName: childFirstName,
            childThirdName: childThirdName,
            birthDate: birthDate,
            exam: exam
        })
    };

    delCall(id: number): Observable<unknown>{
        return this.http.delete(this.url+`/DelCall?id=${id}`)
    };

    createCall(id: number, patientId: number, callStatusName: string, callDate: string){
        return this.http.post(this.url+`/CreateCall`, {
            id: id,
            callStatusName: callStatusName,
            patientId: patientId,
            callDate: callDate
        })
    };
    
    updateCall(id: number, patientId: number, callStatusName: string, callDate: string){
        return this.http.post(this.url+`/UpdateCall`, {
            id: id,
            callStatusName: callStatusName,
            patientId: patientId,
            callDate: callDate
        })
    };
}