import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../services/core/auth/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthStatus().pipe(
    take(1),
    map(isAuth => isAuth ? true : router.createUrlTree(['/auth/login']))
  );
};
