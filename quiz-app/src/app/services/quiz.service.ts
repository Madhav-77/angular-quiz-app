import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = `${environment.apiUrl}quiz/api`;
  
  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quiz_list/`);
  }
}
