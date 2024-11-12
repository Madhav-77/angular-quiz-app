import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { ICreateQuiz, ISubmitAnswer } from '../interfaces/quiz.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = `${environment.apiUrl}quiz/api`;
  
  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quiz_list/`);
  }

  getQuiz(id: number): Observable<any> { 
    return this.http.get<any>(`${this.apiUrl}/display/${id}/`).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  create(quiz: ICreateQuiz): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create/`, quiz).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  submitAnswer(answer: ISubmitAnswer): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submit_answer/`, answer).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getResult(user_id: number, quiz_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/results/${quiz_id}/${user_id}/`).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error(error);
    throw error;
  }
}
