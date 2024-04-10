import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { List2Col } from 'src/app/_interfaces/list-2-col.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseListService {
  url: string = `${environment.apiUrl}/api/ListCheckPlace`;
  constructor(public http: HttpClient){}

  getData(): Observable<List2Col>{
      return this.http.get<List2Col>(this.url);
  };

  del(longName: string): Observable<any>{
      return this.http.delete(this.url+`/Del?longName=${longName}`).pipe(map((data:any) =>{
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

  create(id: number, longName: string, shortName: string){
      return this.http.post(this.url+`/Create`, {
        id: id, 
        longName: longName,
        shortName: shortName
      })
  };

  update(id: number, longName: string, shortName: string){
      return this.http.post(this.url+`/Update`, {
        id: id, 
        longName: longName,
        shortName: shortName
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