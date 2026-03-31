import { Injectable, signal, computed } from '@angular/core';
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
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private sessionSignal = signal<LoginResult['login'] | null>(null);

  public isAuthenticated = computed(() => !!this.sessionSignal);
  // session = computed(() => this.sessionSignal());
  // userId = computed(() => this.sessionSignal()?.user.id ?? '');
  // isAdmin = computed(() => this.sessionSignal()?.user.role === 'Admin');

  constructor(private apollo: Apollo) {
  }

  login(auth: AuthInput): Observable<LoginResult['login']> {
    return this.apollo.query<LoginResult>({
      query: LOGIN,
      variables: { auth },
      fetchPolicy: 'no-cache'
    }).pipe(
      map(result => {
        if (!result.data) {
          throw new Error('No data returned from login query');
        }

        const loginData = result.data.login;
        this.sessionSignal.set(loginData);

        localStorage.setItem('access_token', loginData.access_token);
        localStorage.setItem('refresh_token', loginData.refresh_token);

        return loginData;
      })
    );
  }

  signup(auth: AuthInput): Observable<SignupResult['signup']> {
    return this.apollo.mutate<SignupResult>({
      mutation: SIGNUP,
      variables: { auth }
    }).pipe(
      map(result => {
        if (!result.data) {
          throw new Error('No data returned from signup mutation');
        }

        const signupData = result.data.signup;
        console.log('signupData', signupData);
        this.sessionSignal.set(signupData as any);

        localStorage.setItem('access_token', signupData.access_token);
        localStorage.setItem('refresh_token', signupData.refresh_token);

        return signupData;
      })
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

  logout() {
    this.sessionSignal.set(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  updateToken(): Observable<UpdateTokenResult['updateToken']> {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
      throw new Error('No refresh token');
    }

    return this.apollo.mutate<UpdateTokenResult>({
      mutation: UPDATE_TOKEN,
      context: {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        } as any
      }
    }).pipe(
      map(result => {
        if (!result.data) {
          throw new Error('No data returned from update token mutation');
        }

        const updateTokenData = result.data.updateToken;

        this.sessionSignal.set(updateTokenData as any);

        localStorage.setItem('access_token', updateTokenData.access_token);
        localStorage.setItem('refresh_token', updateTokenData.refresh_token);

        return updateTokenData;
      })
    );
  }
}
