export interface UserProfile {
  id: string;
  full_name: string;
  avatar: string;
}

export interface User {
  id: string;
  email: string;
  profile: UserProfile;
  role: 'Admin' | 'User';
  is_verified: boolean;
}

export interface LoginResult {
  login: {
    user: User;
    access_token: string;
    refresh_token: string;
  };
}

export interface SignupResult {
  signup: {
    user: User;
    access_token: string;
    refresh_token: string;
  };
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
