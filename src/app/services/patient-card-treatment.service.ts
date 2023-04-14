import { ErrorHandler, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, of, throwError } from "rxjs";
import { pcMain } from "../_interfaces/pc-main.model";
import { PatientCardTreatmentModel } from "../_interfaces/patient-card-treatment.model";

@Injectable()
export class PatientCardTreatmentService {
    url: string = 'https://localhost:5001/api/PatientCardTreatment';
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
}