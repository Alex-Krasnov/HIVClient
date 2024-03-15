import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseListService } from './base-list.service';

@Injectable({
  providedIn: 'root'
})
export class ArvtService extends BaseListService{ 
  url: string = `${environment.apiUrl}/api/ListArvt`;
}
