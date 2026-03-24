import { Component } from '@angular/core';
import { Input, Button } from '@hrm-monorepo/hrm-lib';

@Component({
  selector: 'app-login-page',
  imports: [Input, Button],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
  standalone: true,
})
export class LoginPage {}
