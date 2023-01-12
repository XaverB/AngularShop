import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// https://satyapriyamishra111.medium.com/angular-error-interceptor-4b102f938065 08.01.2023
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.error('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            console.error('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          return throwError(() => error);
        })
      )
  }
}