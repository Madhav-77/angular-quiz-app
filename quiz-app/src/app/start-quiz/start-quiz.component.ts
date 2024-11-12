import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-start-quiz',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, NgClass, HeaderComponent],
  templateUrl: './start-quiz.component.html',
  styleUrl: './start-quiz.component.scss'
})
export class StartQuizComponent {

  constructor(private route: ActivatedRoute, private quizService: QuizService, private authService: AuthService, private router: Router) {}

  quizData: any = {};

  currentQuestion = 0;
  selectedAnswer: number = 0;
  answerSubmitted = false;
  feedbackMessage: string = "";
  isCorrect: boolean = false;
  quizCompleted = false;
  viewResultsFlag = false;
  id:any = 0;
  currentUser: any = {};
  finalResult: any = {};

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getQuiz(parseInt(this.id));
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") || '{}')
  }

  getQuiz(id: number){
    this.quizService.getQuiz(id).subscribe({
      next: (data) => (this.quizData = data),
      error: (err) => console.error('Error loading quizzes', err),
    });
  }

  submitAnswer() {
    console.log(this.selectedAnswer)
    const currentQuestionID = this.quizData.questions[this.currentQuestion].id;
    if (this.currentQuestion === this.quizData.questions.length - 1) {
      this.quizCompleted = true;
    }
    this.quizService.submitAnswer({ question_id: parseInt(currentQuestionID), selected_option: this.selectedAnswer }).subscribe({
      next: (data) => (
        this.feedbackMessage = data.message,
        this.isCorrect = data.is_correct,
        this.answerSubmitted = true
      ),
      error: (err) => console.error('Error submitting answer', err),
    });
  }

  nextQuestion() {
    if (this.currentQuestion < this.quizData.questions.length - 1) {
      this.currentQuestion++;
      this.selectedAnswer = 0;
      this.answerSubmitted = false;
    }
  }

  viewResults() {
    const user_id = parseInt(this.currentUser.user_id);
    const quiz_id = parseInt(this.id);
    this.quizService.getResult(user_id, quiz_id).subscribe({
      next: (data) => (
        this.finalResult = data,
        this.viewResultsFlag = true
      ),
      error: (err) => console.error('Error submitting answer', err),
    });
  }

  goToHome() {
    this.router.navigate(['/home'])
  }
}
