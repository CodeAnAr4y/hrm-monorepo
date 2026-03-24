import { Route } from '@angular/router';
import { AuthPage } from './pages/auth/auth.page';
import { UsersPage } from './pages/users/users.page';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
  
  { path: 'users', component: UsersPage },
  { path: 'auth/login', component: AuthPage },
  { path: 'auth/signup', component: AuthPage },
];
