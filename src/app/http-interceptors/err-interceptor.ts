import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrService } from '../services/err.service';

@Injectable()
export class ErrInterceptor implements HttpInterceptor {
  constructor(
    public errService: ErrService
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status != 401) {
          this.openErrorDialog(error);
        }
        return throwError(error)
      })
    );
  }

  openErrorDialog(error: HttpErrorResponse): void {
    this.errService.open(error)
  }
}