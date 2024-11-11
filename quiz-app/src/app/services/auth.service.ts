import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUser } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}user/api`;  // Backend API URL
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Sign up
  signup(user: IUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register/`, user).pipe(
      map(response => {
        this.storeToken(response.access);  // Store token in localStorage or session
        this.currentUserSubject.next(response.data); // Update current user observable
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Sign in
  signin(user: IUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, user).pipe(
      map(response => {
        this.storeToken(response.access);  // Store token in localStorage or session
        this.currentUserSubject.next(response); // Update current user observable
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Generate a new JWT token
  generateToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/token`, { refreshToken }).pipe(
      map(response => {
        this.storeToken(response.token);  // Store the new token
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Logout
  logout(): void {
    this.removeToken();
    this.currentUserSubject.next(null); // Clear the current user
  }

  isUserAuthenticated(){
    return !!localStorage.getItem('jwt_token');
  }

  private storeToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('jwt_token');
  }

  private handleError(error: any): Observable<never> {
    console.error(error);
    throw error; // Proper error handling based on your application needs
  }
}
