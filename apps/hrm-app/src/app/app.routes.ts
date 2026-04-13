import { Route } from '@angular/router';
import { authGuard } from './core/guards/auth/auth-guard';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },

  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then(m => m.AuthPage),
    data: { breadcrumb: { skip: true } },
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/components/login/login.page').then(m => m.LoginPage),
        data: { breadcrumb: { skip: true } }
      },
      {
        path: 'signup',
        loadComponent: () => import('./pages/auth/components/signup/signup.page').then(m => m.SignupPage),
        data: { breadcrumb: { skip: true } }
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  {
    path: 'users',
    canMatch: [authGuard],
    data: { breadcrumb: 'Employees' },
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/users/users.page').then(m => m.UsersPage)
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/user/user.page').then(m => m.UserPage),
        data: { breadcrumb: { alias: 'userEmail' } }, // Динамическое имя подставится сюда
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/user/components/profile/profile.component').then(m => m.ProfileComponent),
            data: { breadcrumb: 'Profile' }
          },
          {
            path: 'skills',
            loadComponent: () => import('./pages/user/components/skills/skills.component').then(m => m.SkillsComponent),
            data: { breadcrumb: 'Skills' }
          },
          {
            path: 'languages',
            loadComponent: () => import('./pages/user/components/languages/languages.component').then(m => m.LanguagesComponent),
            data: { breadcrumb: 'Languages' }
          }
        ]
      }
    ]
  },

  // {
  //   path: 'cvs',
  //   loadComponent: () => import('./pages/cvs/cvs.page').then(m => m.CvsPage),
  //   data: { breadcrumb: 'CVs' }
  // }
];
