import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListSharedServiceService {
  nameList$ = new BehaviorSubject<string>('')

  constructor() { }
  setNameList(val: string){
    this.nameList$.next(val)
  }
}
