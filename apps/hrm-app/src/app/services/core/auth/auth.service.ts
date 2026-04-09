import { Injectable, signal, computed, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN, SIGNUP, FORGOT_PASSWORD, RESET_PASSWORD, UPDATE_TOKEN, PROFILE } from './auth.graphql';
import {
  AuthInput,
  LoginResult,
  SignupResult,
  ForgotPasswordInput,
  ResetPasswordInput,
  UpdateTokenResult
} from './auth.models';
import { map, tap, take, switchMap } from 'rxjs/operators';
import { Observable, of, ReplaySubject } from 'rxjs';
import { UserService } from '../../shared/user/user.service';
import { jwtDecode } from 'jwt-decode';
import { USER } from '../../shared/user/user.graphql';
import { UserResult } from '../../shared/user/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apollo = inject(Apollo);
  private userService = inject(UserService);
  private router = inject(Router);

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
      this.updateToken().pipe(
        switchMap(() => this.fetchCurrentUser()),
        take(1)
      ).subscribe({
        next: () => {
          this.isInitialized$.next(true);
        },
        error: (err) => {
          console.error('Session restoration failed:', err);
          this.logout();
          this.isInitialized$.next(true);
        }
      });
    } else {
      this.isInitialized$.next(true);
    }
  }

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
        this.userService.user.set(res.data.login.user);
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
        this.userService.user.set(res.data.signup.user);
        return res.data.signup;
      }),
      tap(signupData => this.setSession(signupData as any))
    );
  }

  logout() {
    this.sessionSignal.set(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    this.router.navigate(['/auth/login']);
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
        useRefreshToken: true
      }
    }).pipe(
      map(res => {
        if (!res.data) throw new Error('No updateToken data');
        return res.data.updateToken;
      }),
      tap(data => this.setSession(data))
    );
  }

  private fetchCurrentUser(): Observable<UserResult['user']> {
    const token = localStorage.getItem('access_token') || '';
    const decoded: any = jwtDecode(token);
    const userId = decoded.sub;

    return this.apollo.query<UserResult>({
      query: USER,
      variables: { userId },
      fetchPolicy: 'network-only'
    }).pipe(
      map(res => {
        if (!res.data) throw new Error('No signup data');
        this.userService.user.set(res.data.user);
        return res.data.user;
      }),
      tap(user => this.userService.user.set(user))
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
