import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ListDoctor, RowDoctor } from 'src/app/_interfaces/list-doctor.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  url: string = `${environment.apiUrl}/api/ListDoctor`;
  constructor(private http: HttpClient){}

  getData(): Observable<ListDoctor>{
      return this.http.get<ListDoctor>(this.url);
  };

  del(id: number): Observable<any>{
      return this.http.delete(this.url+`/Del?doctroId=${id}`).pipe(map((data:any) =>{
        return data
      }),
      catchError(err =>{
        if(err.error.indexOf('нарушает ограничение внешнего ключа')>-1){
          confirm('Нарушение ограничений внешнего ключа')
          return 'e'
        }
        console.log(err);
        return 'e'
      }))
  };

  create(item: RowDoctor){
      return this.http.post(this.url+`/Create`, {
        id: item.id,
        shortName: item.shortName,
        longName: item.longName,
        doctorCode: item.doctorCode,
        doctorSnils: item.doctorSnils
      })
  };

  update(item: RowDoctor){
      return this.http.post(this.url+`/Update`, {
        id: item.id,
        shortName: item.shortName,
        longName: item.longName,
        doctorCode: item.doctorCode,
        doctorSnils: item.doctorSnils
      })
  };
}
