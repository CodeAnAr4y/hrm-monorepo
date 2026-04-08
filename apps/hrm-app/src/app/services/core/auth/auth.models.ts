import { AuthResult } from '../../../core/models/core.model';

export interface LoginResult {
  login: AuthResult;
}

export interface SignupResult {
  signup: AuthResult;
}

export interface UpdateTokenResult {
  updateToken: AuthResult;
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
