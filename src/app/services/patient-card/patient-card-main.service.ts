import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { PatientCardMainModel } from "../../_interfaces/patient-card-main.model";
import { Observable } from "rxjs";
import { pcMain } from "../../_interfaces/pc-main.model";
import { environment } from "src/environments/environment";

@Injectable()
export class PatientCardMainService {
    url: string = `${environment.apiUrl}/api/PatientCard`;
    constructor(private http: HttpClient){}

    getPatientData(id: number | null): Observable<PatientCardMainModel>{

        if(id == null){
            return this.http.get<PatientCardMainModel>(this.url);
        }

        return this.http.get<PatientCardMainModel>(this.url+`?patientId=${id}`);
    };

    delPatientBlot(patientId: number, blotId: number): Observable<unknown>{
        return this.http.delete(this.url+`/DelBlot?patientId=${patientId}&blotId=${blotId}`)
    };

    createPatientBlot(patientId: number, blotId: number, blotNo: number, blotDate: Date, 
        ibResultId: string, checkPlaceId: string, first: boolean, last: boolean, flgIfa: boolean, referenceMo: string){
        return this.http.post(this.url+`/CreateBlot`, {
            PatientId: patientId, 
            BlotId: blotId,
            BlotNo: blotNo,
            BlotDate: blotDate,
            IbResultId: ibResultId,
            CheckPlaceId: checkPlaceId,
            First1: first,
            Last1: last,
            FlgIfa: flgIfa,
            ReferenceMo: referenceMo
        })
    };

    updatePatientBlot(patientId: number, blotId: number, blotIdOld: number, blotNo: number, blotDate: Date, 
        ibResultId: string, checkPlaceId: string, first: boolean, last: boolean, flgIfa: boolean, referenceMo: string){
            return this.http.post(this.url+`/UpdateBlot`, {
                PatientId: patientId, 
                BlotId: blotId,
                BlotNo: blotNo,
                BlotDate: blotDate,
                IbResultId: ibResultId,
                CheckPlaceId: checkPlaceId,
                First1: first,
                Last1: last,
                FlgIfa: flgIfa,
                BlotIdOld: blotIdOld,
                ReferenceMo: referenceMo
            })
    };

    delPatientStage(patientId: number, date: Date){
        return this.http.delete(this.url+`/DelStage?patientId=${patientId}&date=${date}`)
    };

    createPatientStage(patientId: number, dateStart: string, name: string){
        return this.http.post(this.url+`/CreateStage`, {
            PatientId: patientId, 
            StageDate: dateStart,
            StageName: name
        })
    };

    updatePatientStage(patientId: number, dateStage: string, dateStageOld: string, name: string){
        return this.http.post(this.url+`/UpdateStage`, {
            PatientId: patientId, 
            StageDate: dateStage, 
            StageName: name,
            StageDateOld: dateStageOld
        })
    };

    delPatientSecondDesease(patientId: number, date: Date, name: string){
        return this.http.delete(this.url+`/DelSecondDeseases?patientId=${patientId}&startDate=${date}&deseas=${name}`)
    };

    createPatientSecondDesease(patientId: number, dateStart: string, dateEnd: string, name: string){
        return this.http.post(this.url+`/CreateSecondDeseases`, {
            PatientId: patientId, 
            StartDate: dateStart, 
            EndDate: dateEnd, 
            Deseas: name
        })
    };

    updatePatientSecondDesease(patientId: number, dateStart: string, dateEnd: string, name: string, dateStartOld: string, nameOld: string){
        return this.http.post(this.url+`/UpdateSecondDeseases`, {
            PatientId: patientId, 
            StartDate: dateStart, 
            EndDate: dateEnd, 
            Deseas: name,
            StartDateOld: dateStartOld,
            DeseasOld: nameOld
        })
    };

    delPatientPatient(patientId: number){
        return this.http.delete(this.url+`/DelPatientPatient?patientId=${patientId}`)
    };

    updatePatient(patient: pcMain): Observable<number>{
        return this.http.post<number>(this.url+`/UpdatePatient`, patient)
    };
}