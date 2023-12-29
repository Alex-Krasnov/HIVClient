import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading$ = new BehaviorSubject<boolean>(false)

  open() {
    this.isLoading$.next(true)
  }

  close() {
    this.isLoading$.next(false)
  }
}
