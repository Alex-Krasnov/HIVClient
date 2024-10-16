import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ErrService {
  constructor(
    public loading: LoadingService
  ){}

  errData: HttpErrorResponse
  errIsVisible$ = new BehaviorSubject<boolean>(false)
  
  open(err: HttpErrorResponse) {
    this.errData = err
    this.errIsVisible$.next(true)
  }

  close() {
    this.errData = null
    this.loading.close()
    this.errIsVisible$.next(false)
  }
}
