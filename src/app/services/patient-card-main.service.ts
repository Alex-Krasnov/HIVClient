import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticatedResponse } from "../_interfaces/authenticated-response.model";
import { PatientCardMainModel } from "../_interfaces/patient-card-main.model";
import { Observable, of } from "rxjs";
import { Call } from "@angular/compiler";

@Injectable()
export class PatientCardMain {
    patient: PatientCardMainModel | undefined;
    constructor(private http: HttpClient){}

    getPatientData(id: number): Observable<PatientCardMainModel>{
        return this.http.get<PatientCardMainModel>(`https://localhost:5001/api/PatientCard?patientId=${id}`);
    };
}