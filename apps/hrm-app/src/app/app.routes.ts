import { Route } from '@angular/router';
import { AuthPage } from './pages/auth/auth.page';
import { UsersPage } from './pages/users/users.page';
import { LoginPage } from './pages/auth/components/login/login.page';
import { SignupPage } from './pages/auth/components/signup/signup.page';
import { RestorePasswordPage } from './pages/auth/components/restore-password/restore-password.page';
import { authGuard } from './core/guards/auth/auth-guard';
import { UserPage } from './pages/user/user.page';
import { ProfileComponent } from './pages/user/components/profile/profile.component';
import { SkillsComponent } from './pages/user/components/skills/skills.component';
import { LanguagesComponent } from './pages/user/components/languages/languages.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },

  {
    path: 'auth',
    component: AuthPage,
    children: [
      { path: 'login', component: LoginPage /* canActivate: [guestGuard] */ },
      { path: 'signup', component: SignupPage /* canActivate: [guestGuard] */ },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  { path: 'restore-password', component: RestorePasswordPage },
  {
    path: 'users/:id',
    canActivate: [authGuard],
    component: UserPage,
    children: [
      { path: '', component: ProfileComponent, canActivate: [authGuard] },
      { path: 'skills', component: SkillsComponent, canActivate: [authGuard] },
      { path: 'languages', component: LanguagesComponent, canActivate: [authGuard] }
    ]
  },
  {
    path: 'users',
    canActivate: [authGuard],
    component: UsersPage
  }
];
