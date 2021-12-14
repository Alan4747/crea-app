import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { APP_INITIALIZER, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authentication: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers: request.headers.set(`Authorization`, `Bearer ${this.authentication.token}`)
    });    
    return next.handle(request);
  }
}