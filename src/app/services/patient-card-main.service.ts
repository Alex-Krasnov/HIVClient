import { ErrorHandler, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { PatientCardMainModel } from "../_interfaces/patient-card-main.model";
import { catchError, Observable, of, throwError } from "rxjs";

@Injectable()
export class PatientCardMain {
    // patient: PatientCardMainModel | undefined;
    url: string = 'https://localhost:5001/api/PatientCard';
    constructor(private http: HttpClient){}

    getPatientData(id: number): Observable<PatientCardMainModel>{
        return this.http.get<PatientCardMainModel>(this.url+`?patientId=${id}`);
    };

    delPatientBlot(patientId: number, blotId: number): Observable<unknown>{
        return this.http.delete(this.url+`/DelBlot?patientId=${patientId}&blotId=${blotId}`)
    };

    delPatientStage(patientId: number, date: Date){
        return this.http.delete(this.url+`/DelStage?patientId=${patientId}&date=${date}`)
    };

    delPatientSecondDesease(patientId: number, date: Date, name: string){
        return this.http.delete(this.url+`/DelSecondDeseases?patientId=${patientId}&date=${date}&deseases=${name}`)
    };

    delPatientPatient(id: number){
        
    };
}