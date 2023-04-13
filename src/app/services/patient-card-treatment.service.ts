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
}