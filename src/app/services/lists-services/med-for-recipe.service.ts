import { Injectable } from '@angular/core';
import { BaseListService } from './base-list.service';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedForRecipeService extends BaseListService{ 
  url: string = `${environment.apiUrl}/api/ListMedForRecipe`;

  createMed(id: number, longName: string, isActive: boolean): Observable<Object> {
    return this.http.post(this.url+`/Create`, {
          id: id, 
          longName: longName,
          isActive: isActive
        })
  }
  
  updateMed(id: number, longName: string, isActive: boolean){
      return this.http.post(this.url+`/Update`, {
        id: id, 
        longName: longName,
        isActive: isActive
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
