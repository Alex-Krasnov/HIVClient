import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PassportModel } from '../_interfaces/passport.model';
import { Observable } from 'rxjs';
import { PassportOutModel } from '../_interfaces/passport-out.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassportService {
  url: string = `${environment.apiUrl}/api/Passport`;
  constructor(private http: HttpClient){}

  getData(id: number): Observable<PassportModel>{
      return this.http.get<PassportModel>(this.url+`?patientId=${id}`);
  };

  updatePas(patient: PassportOutModel){
    return this.http.post(this.url+`/Update`, patient)
  };
}
