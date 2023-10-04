import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticatedResponse } from "../_interfaces/authenticated-response.model";
import { environment } from "src/environments/environment";

@Injectable()
export class logOut {

    constructor(private http: HttpClient){}

    revokeToken(){
        const token = localStorage.getItem("jwt");
        const refreshToken: string = localStorage.getItem("refreshToken");
        const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

        this.http.post<AuthenticatedResponse>(`${environment.apiUrl}/api/token/revoke`, credentials, {
            headers: new HttpHeaders({
              "Content-Type": "application/json"
            })
          }).subscribe();
        
        localStorage.removeItem("jwt");
        localStorage.removeItem("refreshToken");
    };    
}