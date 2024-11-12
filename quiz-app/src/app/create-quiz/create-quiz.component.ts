import { NgIf, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, NgIf, NgForOf],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.scss'
})
export class CreateQuizComponent {
  quizForm: FormGroup;

  constructor(private fb: FormBuilder, private quizService: QuizService, private router: Router) {
    this.quizForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      questions: this.fb.array([
        this.createStaticQuestion(),
        this.createStaticQuestion(),
        this.createStaticQuestion(),
        this.createStaticQuestion(),
        this.createStaticQuestion(),
        this.createStaticQuestion()
      ])
    });
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  private createStaticQuestion(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ]),
      correct_option: ['', Validators.required]
    });
  }

  submitForm(): void {
    this.quizForm.statusChanges.subscribe(status => {
      console.log('Form Status: ', status);
      console.log('Form Errors: ', this.quizForm.errors);
    });
    console.log(this.quizForm.value);
    if (this.quizForm.valid) {
      this.quizService.create(this.quizForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/home']);
          console.log('quiz created successfully', response);
        },
        error: (error) => {
          console.error('quiz creation error', error);
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
