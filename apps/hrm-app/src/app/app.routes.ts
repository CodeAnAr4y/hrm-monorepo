import { Route } from '@angular/router';
import { AuthPage } from './pages/auth/auth.page';
import { UsersPage } from './pages/users/users.page';
import { LoginPage } from './pages/auth/components/login/login.page';
import { SignupPage } from './pages/auth/components/signup/signup.page';
import { RestorePasswordPage } from './pages/auth/components/restore-password/restore-password.page';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    component: AuthPage,
    children: [
      { path: 'login', component: LoginPage },
      { path: 'signup', component: SignupPage },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  { path: 'restore-password', component: RestorePasswordPage },
  { path: 'users', component: UsersPage },
];
