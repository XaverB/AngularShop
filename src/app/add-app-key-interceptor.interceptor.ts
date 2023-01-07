import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

// credits to https://stackoverflow.com/a/45221680
@Injectable()
export class AddAppKeyInterceptorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // oauth does not like appkey header
    if(request.url.includes("auth")) return next.handle(request);

    // Clone the request to add the new header (respect principle of immutability)
    const clonedRequest = request.clone({ headers: request.headers.append('appKey', environment.appKey) });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
