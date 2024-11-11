import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss'
})
export class LogoutButtonComponent {

  constructor(private router: Router) {}
  
  logout() {
    localStorage.removeItem('jwt_token');  // Remove JWT or any token you use
    this.router.navigate(['/']);     // Redirect to the signin page
  }
}
