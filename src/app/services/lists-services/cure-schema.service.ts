import { Injectable } from '@angular/core';
import { BaseListService } from './base-list.service';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map } from 'rxjs';
import { MedForSchema } from 'src/app/_interfaces/med-for-schema.model';

@Injectable({
  providedIn: 'root'
})
export class CureSchemaService extends BaseListService{ 
  url: string = `${environment.apiUrl}/api/ListCureSchema`;
  
  getStructureSchema(id: number): Observable<MedForSchema[]>{
    return this.http.get<MedForSchema[]>(this.url+`/GetStructureSchema?id=${id}`)
  };

  createSchema(id: number, longName: string, meds: number[]): Observable<any>{
    return this.http.post(this.url+`/Create`, {
      id: id, 
      longName: longName,
      meds: meds
    }).pipe(map((data:any) =>{
      return data
    }),
    catchError(err =>{
      confirm(err.error)
      console.log(err);
      return 'e'
    }))
  };

  updateSchema(id: number, longName: string, meds: number[]): Observable<any>{
    return this.http.post(this.url+`/UpdateStructureSchema`, {
      id: id, 
      longName: longName,
      meds: meds
    }).pipe(map((data:any) =>{
      return data
    }),
    catchError(err =>{
      confirm(err.error)
      console.log(err);
      return 'e'
    }))
  };
}
