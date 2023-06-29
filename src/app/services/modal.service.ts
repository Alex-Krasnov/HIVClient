import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  isVisible$ = new BehaviorSubject<boolean>(false)
  dieIsVisible$ = new BehaviorSubject<boolean>(false)
  pasIsVisible$ = new BehaviorSubject<boolean>(false)
  dieCourseIsVisible$ = new BehaviorSubject<boolean>(false)
  course2ColIsVisible$ = new BehaviorSubject<boolean>(false)

  open() {
    this.isVisible$.next(true)
  }

  close() {
    this.isVisible$.next(false)
    this.dieIsVisible$.next(false)
    this.pasIsVisible$.next(false)
    this.dieCourseIsVisible$.next(false)
    this.course2ColIsVisible$.next(false)
  }

  dieOpen() {
    this.dieIsVisible$.next(true)
  }

  pasOpen() {
    this.pasIsVisible$.next(true)
  }

  dieCourseOpen() {
    this.dieCourseIsVisible$.next(true)
  }

  course2ColOpen() {
    this.course2ColIsVisible$.next(true)
  }
}
