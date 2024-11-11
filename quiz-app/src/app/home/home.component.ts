import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { QuizService } from '../services/quiz.service';
import { IQuizList } from '../interfaces/quiz.interface';
import { HeaderComponent } from '../header/header.component';

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

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.getQuizList();
  }

  getQuizList(): void {
    this.quizService.getQuizzes().subscribe({
      next: (data) => (this.quizList = data),
      error: (err) => console.error('Error loading quizzes', err),
    });
  }
  
  // Method to handle quiz selection from dropdown
  selectQuiz(id: number): void {
    this.selectedQuiz = this.quizList.find(obj => obj.id == id)!.title;
  }

  // Method for creating a quiz
  createQuiz(): void {
    console.log('Create Quiz clicked');
    // Add your create quiz logic here
  }

  // Method for starting a quiz
  startQuiz(): void {
    console.log(`Starting quiz: ${this.selectedQuiz}`);
    // Add your start quiz logic here
  }
}
