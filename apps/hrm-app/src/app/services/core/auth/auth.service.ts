import { Injectable, signal, computed, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN, SIGNUP, FORGOT_PASSWORD, RESET_PASSWORD, UPDATE_TOKEN } from './auth.graphql';
import {
  AuthInput,
  LoginResult,
  SignupResult,
  ForgotPasswordInput,
  ResetPasswordInput,
  UpdateTokenResult
} from './auth.models';
import { map, tap, take } from 'rxjs/operators';
import { Observable, of, ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apollo = inject(Apollo);

  private sessionSignal = signal<LoginResult['login'] | null>(null);

  private isInitialized$ = new ReplaySubject<boolean>(1);

  public isAuthenticated = computed(() => !!this.sessionSignal());
  public session = computed(() => this.sessionSignal());
  public accessToken = computed(() => this.sessionSignal()?.access_token ?? null);

  constructor() {
    this.initSession();
  }

  private initSession() {
    const access = localStorage.getItem('access_token');
    const refresh = localStorage.getItem('refresh_token');

    if (access && refresh) {
      // 1. Предварительно восстанавливаем состояние из хранилища, чтобы Guard разрешил переход
      this.sessionSignal.set({ access_token: access, refresh_token: refresh } as any);

      // 2. Проверяем валидность сессии, пытаясь обновить access_token
      this.updateToken().pipe(take(1)).subscribe({
        next: () => {
          console.log('Session restored successfully');
          this.isInitialized$.next(true);
        },
        error: (err) => {
          console.error('Session validation failed:', err);
          // Если сервер подтвердил, что refresh-токен невалиден (401), разлогиниваем
          this.logout();
          this.isInitialized$.next(true);
        }
      });
    } else {
      this.isInitialized$.next(true);
    }
  }

  // Используется в authGuard
  checkAuthStatus(): Observable<boolean> {
    return this.isInitialized$.asObservable().pipe(
      map(() => this.isAuthenticated())
    );
  }

  login(auth: AuthInput): Observable<LoginResult['login']> {
    return this.apollo.query<LoginResult>({
      query: LOGIN,
      variables: { auth },
      fetchPolicy: 'no-cache'
    }).pipe(
      map(res => {
        if (!res.data) throw new Error('No login data');
        return res.data.login;
      }),
      tap(loginData => this.setSession(loginData))
    );
  }

  signup(auth: AuthInput): Observable<SignupResult['signup']> {
    return this.apollo.mutate<SignupResult>({
      mutation: SIGNUP,
      variables: { auth }
    }).pipe(
      map(res => {
        if (!res.data) throw new Error('No signup data');
        return res.data.signup;
      }),
      tap(signupData => this.setSession(signupData as any))
    );
  }

  logout() {
    this.sessionSignal.set(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  private setSession(data: any) {
    this.sessionSignal.set(data);
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
  }

  updateToken(): Observable<UpdateTokenResult['updateToken']> {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
      this.logout();
      return of();
    }

    return this.apollo.mutate<UpdateTokenResult>({
      mutation: UPDATE_TOKEN,
      context: {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        } as any,
        // КЛЮЧЕВОЙ МОМЕНТ: флаг для authLink в app.config.ts
        useRefreshToken: true
      }
    }).pipe(
      map(res => {
        if (!res.data) throw new Error('No updateToken data');
        return res.data.updateToken;
      }),
      tap(data => this.setSession(data))
      // catchError убран, чтобы ошибку обрабатывал вызывающий код (initSession или errorLink)
    );
  }

  forgotPassword(auth: ForgotPasswordInput) {
    return this.apollo.mutate<void>({
      mutation: FORGOT_PASSWORD,
      variables: { auth }
    });
  }

  resetPassword(auth: ResetPasswordInput) {
    return this.apollo.mutate<void>({
      mutation: RESET_PASSWORD,
      variables: { auth }
    });
  }
}
