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
    data: { breadcrumb: { skip: true } },
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
            path: ':userId',
            loadComponent: () => import('./pages/user/user.page').then(m => m.UserPage),
            data: { breadcrumb: { label: '', alias: 'userEmail' } },
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
      {
        path: 'cvs',
        data: { breadcrumb: 'CVs' },
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/cvs/cvs.page').then(m => m.CvsPage)
          },
          {
            path: ':cvId',
            loadComponent: () => import('./pages/cv/cv.page').then(m => m.CvPage),
            data: { breadcrumb: { label: '', alias: 'userCv' } },
            children: [
              {
                path: '',
                loadComponent: () => import('./pages/cv/components/details/details.component').then(m => m.DetailsComponent),
                data: { breadcrumb: 'Details' }
              },
              {
                path: 'skills',
                loadComponent: () => import('./pages/cv/components/cv-skills/cv-skills.component').then(m => m.CvSkillsComponent),
                data: { breadcrumb: 'Skills' }
              },
              {
                path: 'projects',
                loadComponent: () => import('./pages/cv/components/projects/projects.component').then(m => m.ProjectsComponent),
                data: { breadcrumb: 'Projects' }
              },
              {
                path: 'preview',
                loadComponent: () => import('./pages/cv/components/preview/preview.component').then(m => m.PreviewComponent),
                data: { breadcrumb: 'Preview' }
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
