import { HttpEvent, HttpRequest, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const token = localStorage.getItem('jwt_token'); // Replace 'jwt_token' with the actual key
  
    const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
  
    return next(authReq);
};
