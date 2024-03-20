import { Injectable } from '@angular/core';
import { BaseListService } from './base-list.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaceCheckService extends BaseListService{ 
  url: string = `${environment.apiUrl}/api/ListPlaceCheck`;
}
