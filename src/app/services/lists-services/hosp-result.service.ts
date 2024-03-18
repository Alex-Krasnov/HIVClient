import { Injectable } from '@angular/core';
import { BaseListService } from './base-list.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HospResultService extends BaseListService{ 
  url: string = `${environment.apiUrl}/api/ListHospResult`;
}
