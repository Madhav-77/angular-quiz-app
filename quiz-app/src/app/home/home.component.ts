import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { QuizService } from '../services/quiz.service';
import { IQuizList } from '../interfaces/quiz.interface';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  quizList: IQuizList[] = [];
  selectedQuiz: string | null = null;
  selectedQuizId: number | null = null;

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.getQuizList();
  }

  getQuizList(): void {
    this.quizService.getQuizzes().subscribe({
      next: (data) => (this.quizList = data),
      error: (err) => console.error('Error loading quizzes', err),
    });
  }
  
  selectQuiz(id: number): void {
    this.selectedQuiz = this.quizList.find(obj => obj.id == id)!.title;
    this.selectedQuizId = id;
  }

  createQuiz(): void {
    this.router.navigate(['create-quiz'])
  }

  startQuiz(): void {
    this.router.navigate(['start-quiz', this.selectedQuizId])
  }
}
