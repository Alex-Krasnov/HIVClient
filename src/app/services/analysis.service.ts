import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Analysis } from '../_interfaces/analysis.model';
import { PagedResponse } from '../_interfaces/paged-pesponse.model';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  url: string = `${environment.apiUrl}/api/Analysis`;
  constructor(private http: HttpClient) { }

  getData(
    id: number | null,
    startDate: Date | null,
    endDate: Date | null,
    code: string | null,
    page: number = 1
  ): Observable<PagedResponse<Analysis>> {

    const formatDate = (date: Date | null) => {
      const dateObj = date instanceof Date ? date : new Date(date)

      if (isNaN(dateObj.getTime())) {
        return null
      }

      return dateObj.toISOString().split('T')[0]
    };

    var params = new HttpParams()
      .set('PageNumber', page.toString());

    if (id != null)
      params = params.set('PatientId', id.toString())

    if (startDate != null && formatDate(startDate) != null)
      params = params.set('StartDate', formatDate(startDate))

    if (endDate != null && formatDate(endDate) != null)
      params = params.set('EndDate', formatDate(endDate))

    if (code != null)
      params = params.set('AnalysisCode', code)

    return this.http.get<PagedResponse<Analysis>>(this.url, { params });
  };

  delAnalysis(id: number, date: Date, code: string): Observable<void> {
    const params = new HttpParams()
      .set('patientId', id.toString())
      .set('analysisDate', new Date(date).toISOString())
      .set('analysisCode', code);

    return this.http.delete<void>(this.url, { params });
  }
}
