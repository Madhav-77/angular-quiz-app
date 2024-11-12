import { HttpEvent, HttpRequest, HttpInterceptorFn, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const token = localStorage.getItem('jwt_token');
  
    if (req.url.includes('/signin') || req.url.includes('/register')) {
        return next(req);
    }

    const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
  
    const authService = inject(AuthService);
    
    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            authService.logout();  
          }
          return new Observable<HttpEvent<any>>(observer => observer.error(error));
        })
      );
};
