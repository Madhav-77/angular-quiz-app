import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUser } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}user/api`;
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Sign up
  signup(user: IUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register/`, user).pipe(
      map(response => {
        this.storeToken(response.data.access);
        this.currentUserSubject.next(response.data);
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Sign in
  signin(user: IUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, user).pipe(
      map(response => {
        this.storeToken(response.access);
        this.currentUserSubject.next(response);
        localStorage.setItem("currentUser", JSON.stringify(response));
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Logout
  logout(): void {
    this.removeToken();
    this.currentUserSubject.next(null);
  }

  isUserAuthenticated(){
    return !!localStorage.getItem('jwt_token');
  }

  private storeToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem("currentUser");
  }

  private handleError(error: any): Observable<never> {
    console.error(error);
    throw error;
  }
}
