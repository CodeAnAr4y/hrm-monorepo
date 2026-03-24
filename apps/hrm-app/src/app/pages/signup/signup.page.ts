import { Component } from '@angular/core';
import { Input, Button } from '@hrm-monorepo/hrm-lib';

@Component({
  selector: 'app-signup-page',
  imports: [Input, Button],
  templateUrl: './signup.page.html',
  styleUrl: './signup.page.css',
  standalone: true,
})
export class SignupPage {}
 