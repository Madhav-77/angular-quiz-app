import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
 
})
export class SigninComponent {
  authForm: FormGroup;
  tab: 'signin' | 'signup' = 'signin';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9@.+\-_]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  setTab(tab: 'signin' | 'signup') {
    this.tab = tab;
  }

  onSubmit() {
    if (this.tab === 'signin') {
      if (this.authForm.valid) {
        this.signinUser(this.authForm.value.username, this.authForm.value.password);
        console.log('Signing In', this.authForm.value);
      } else {
        this.authForm.markAllAsTouched();
      }
    } else {
      if (this.authForm.valid) {
        this.registerUser(this.authForm.value.username, this.authForm.value.password);
        console.log('Registering', this.authForm.value);
      } else {
        this.authForm.markAllAsTouched();
      }
    }
  }

  signinUser(username: string, password: string) {
    this.authService.signin({username, password}).subscribe({
      next: (response) => {
        this.router.navigate(['/home']);
        console.log('Signed in successfully', response);
      },
      error: (error) => {
        console.error('Signin error', error);
      }
    });
  }

  registerUser(username: string, password: string) {
    this.authService.signup({username, password}).subscribe({
      next: (response) => {
        this.router.navigate(['/home']);
        console.log('Registered successfully', response);
      },
      error: (error) => {
        console.error('Register error', error);
      }
    });
  }
}
