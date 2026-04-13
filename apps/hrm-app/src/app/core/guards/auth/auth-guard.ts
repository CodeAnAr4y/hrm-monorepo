import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../../../services/core/auth/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs/operators';

export const authGuard: CanMatchFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthStatus().pipe(
    take(1),
    map(isAuth => {
      if (isAuth) {
        return true;
      }
      return router.createUrlTree(['/auth/login']);
    })
  );
};
