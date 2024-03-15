import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseListService } from './base-list.service';

@Injectable({
  providedIn: 'root'
})
export class InfectCourseService  extends BaseListService{ 
  url: string = `${environment.apiUrl}/api/ListInfectCourse`;
}
