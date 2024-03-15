import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseListService } from './base-list.service';

@Injectable({
  providedIn: 'root'
})
export class CheckCourseService extends BaseListService{ 
  url: string = `${environment.apiUrl}/api/ListCheckCourse`;
}
