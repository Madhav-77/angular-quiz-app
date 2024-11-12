import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss'
})
export class LogoutButtonComponent {

  constructor(private router: Router, private authService: AuthService) {}
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
