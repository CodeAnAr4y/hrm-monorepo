import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent, InputComponent, ButtonVariant } from '@hrm-monorepo/hrm-lib';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/core/auth/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    RouterLink
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
  standalone: true
})
export class LoginPage {
  protected readonly ButtonVariant = ButtonVariant;
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  submit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.getRawValue();

    this.auth.login({ email, password }).subscribe({
      next: (data) => {
        console.log('Login successful', data);
        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.error('Login error', err);
      }
    });
  }
}
