import { authGuard } from './core/guards/auth/auth-guard';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then(m => m.AuthPage),
    data: { breadcrumb: { skip: true } },
    children: [
      { path: 'login', loadComponent: () => import('./pages/auth/components/login/login.page').then(m => m.LoginPage) },
      {
        path: 'signup',
        loadComponent: () => import('./pages/auth/components/signup/signup.page').then(m => m.SignupPage)
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/main/main.page').then(m => m.MainPage),
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        data: { breadcrumb: 'Employees' },
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/users/users.page').then(m => m.UsersPage)
          },
          {
            path: ':id',
            loadComponent: () => import('./pages/user/user.page').then(m => m.UserPage),
            data: { breadcrumb: { alias: 'userEmail' } },
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
              }
            ]
          }
        ]
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage),
        data: { breadcrumb: 'Settings' }
      }
    ]
  },

  { path: '**', redirectTo: '' }
];
