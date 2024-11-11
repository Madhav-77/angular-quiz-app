import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const service = inject(AuthService);

  if (service.isUserAuthenticated()) {
    return true;
  }

  router.navigate(['/']);
  return false
};