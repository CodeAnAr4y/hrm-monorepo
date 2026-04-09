import { AuthResult } from '../../../core/models/core.model';

export interface LoginResult {
  login: AuthResult;
}

export interface SignupResult {
  signup: AuthResult;
}

export interface UpdateTokenResult {
  updateToken: {
    access_token: string;
    refresh_token: string;
  };
}

export interface AuthInput {
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  password: string;
  token: string;
}
