import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private baseUrl = 'https://shahriarrahman183.bsite.net/';

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request and modify the URL
    const modifiedRequest = request.clone({
      url: this.baseUrl + request.url,
    });

    // Pass the modified request to the next interceptor or to the HTTP client
    return next.handle(modifiedRequest);
  }
}
