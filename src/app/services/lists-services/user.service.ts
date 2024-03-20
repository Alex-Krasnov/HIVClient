import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ListUser } from 'src/app/_interfaces/list-user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = `${environment.apiUrl}/api/ListUser`;
  constructor(private http: HttpClient){}

  getData(): Observable<ListUser[]>{
      return this.http.get<ListUser[]>(this.url);
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

  create(user: ListUser){
      return this.http.post(this.url+`/Create`, {
        uid: user.uid,
        pwd: user.pwd,
        userName: user.userName,
        excel: user.excel,
        write: user.write,
        admin: user.admin,
        deleter: user.deleter,
        klassif: user.klassif
      })
  };

  update(user: ListUser){
      return this.http.post(this.url+`/Update`, {
        uid: user.uid,
        pwd: user.pwd,
        userName: user.userName,
        excel: user.excel,
        write: user.write,
        admin: user.admin,
        deleter: user.deleter,
        klassif: user.klassif
      })
  };
}
