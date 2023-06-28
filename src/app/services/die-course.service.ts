import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DieCourseAdvancedModel } from '../_interfaces/die-course-advanced.model';

@Injectable({
  providedIn: 'root'
})
export class DieCourseService {
  url: string = 'https://localhost:5001/api/DieCourse';
  constructor(private http: HttpClient){}

  getData(id: number): Observable<DieCourseAdvancedModel>{
      return this.http.get<DieCourseAdvancedModel>(this.url+`?patientId=${id}`);
  };
  
  updateDie(die: DieCourseAdvancedModel){
    return this.http.post(this.url+`/Update`, die)
  };
}