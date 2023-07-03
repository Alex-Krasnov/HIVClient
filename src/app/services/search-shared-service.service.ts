import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchSharedServiceService {
  nameSearch$ = new BehaviorSubject<string>('')
  xlIsActive$ = new BehaviorSubject<boolean>(false)
  printIsActive$ = new BehaviorSubject<boolean>(false)
  search$ = new BehaviorSubject<string>('')
  
  refreshData$ = new BehaviorSubject<boolean>(false)
  visibleData$ = new BehaviorSubject<boolean>(false)

  constructor() { }

  switchVal(name:string, val: boolean){
    switch (name) {
      case "xl":
        this.xlIsActive$.next(val)
        break;
      case "print":
        this.printIsActive$.next(val)
        break;
    }
  }

  searchGive(name: string ){
    this.search$.next(name)
  }

  setNameSearch(val: string){
    this.nameSearch$.next(val)
  }
}
