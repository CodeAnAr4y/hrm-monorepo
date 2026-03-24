import { Component } from '@angular/core';
import { LoginPage } from '../login/login.page';
import { SignupPage } from '../signup/signup.page';
import { Tab, Tabs } from '@hrm-monorepo/hrm-lib';
@Component({
  selector: 'app-auth-page',
  imports: [LoginPage, SignupPage, Tabs, Tab],
  templateUrl: './auth.page.html',
  standalone: true,
})
export class AuthPage {}
