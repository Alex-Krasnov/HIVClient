import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  isVisible$ = new BehaviorSubject<boolean>(false)
  regIsVisible$ = new BehaviorSubject<boolean>(false)
  regIsVisible1$ = new BehaviorSubject<boolean>(false)
  regIsVisible2$ = new BehaviorSubject<boolean>(false)
  regIsVisible3$ = new BehaviorSubject<boolean>(false)
  dieIsVisible$ = new BehaviorSubject<boolean>(false)
  pasIsVisible$ = new BehaviorSubject<boolean>(false)
  dieCourseIsVisible$ = new BehaviorSubject<boolean>(false)
  course2ColIsVisible$ = new BehaviorSubject<boolean>(false)
  referalAnalysisIsVisible$ = new BehaviorSubject<boolean>(false)
  listCureSchema$ = new BehaviorSubject<boolean>(false)

  open() {
    this.isVisible$.next(true)
  }

  close() {
    this.isVisible$.next(false)
    this.dieIsVisible$.next(false)
    this.pasIsVisible$.next(false)
    this.dieCourseIsVisible$.next(false)
    this.course2ColIsVisible$.next(false)
    this.regIsVisible$.next(false)
    this.regIsVisible1$.next(false)
    this.regIsVisible2$.next(false)
    this.regIsVisible3$.next(false)
    this.referalAnalysisIsVisible$.next(false)
    this.listCureSchema$.next(false)
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

  regOpen() { 
    this.regIsVisible$.next(true)
  }

  referalAnalysisOpen() { 
    this.referalAnalysisIsVisible$.next(true)
  }

  listCureSchemaOpen() { 
    this.listCureSchema$.next(true)
  }
}
