import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PatientCardFilesModel } from "../_interfaces/patient-card-files.model";

@Injectable({
  providedIn: 'root'
})
export class PatientCardFilesService {
  url: string = `${environment.apiUrl}/api/PatientCardFiles`;
  constructor(private http: HttpClient){}

  getData(id: number): Observable<PatientCardFilesModel>{
      return this.http.get<PatientCardFilesModel>(this.url+`?patientId=${id}`);
  };

  uploadFile( formData: FormData ): Observable<any> {
    return this.http.post(this.url+`/UploadFile`, formData);
  };

  deleteFile( formData: FormData ): Observable<any> {
    return this.http.post(this.url+`/DeleteFile`, formData);
  };
  
  downloadFile( formData: FormData ): Observable<Blob> {
    return this.http.post(this.url+`/DownloadFile`, formData, { responseType: 'blob'});
  };
}
