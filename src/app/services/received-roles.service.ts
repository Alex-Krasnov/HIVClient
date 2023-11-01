import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceivedRolesService {
  
  isExcel: boolean = false
  isWriter: boolean = false
  isAdmin: boolean = false
  IsDeleter: boolean = false
  isKlassif: boolean = false
}
