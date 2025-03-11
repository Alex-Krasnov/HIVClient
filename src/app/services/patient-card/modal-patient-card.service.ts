import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalPatientCardService {
  
  patientId = new BehaviorSubject<number>(1)
  isVisible$ = new BehaviorSubject<boolean>(false)
  currentPage = new BehaviorSubject<string>('main')
  goNext = new BehaviorSubject<string>('main')

  open() {
    this.isVisible$.next(true)
  }

  close() {
    this.isVisible$.next(false)
  }

  nextPage(name:string){
    this.goNext.next(name)
  }
}
