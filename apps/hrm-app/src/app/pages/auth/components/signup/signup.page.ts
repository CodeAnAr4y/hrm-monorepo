import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, InputComponent, ButtonVariant } from '@hrm-monorepo/hrm-lib';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/core/auth/auth.service';

@Component({
  selector: 'app-signup-page',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    RouterLink
  ],
  templateUrl: './signup.page.html',
  styleUrl: './signup.page.scss',
  standalone: true,
})
export class SignupPage {
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

    this.auth.signup({ email, password }).subscribe({
      next: (data) => {
        console.log('Signup successful', data);
        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.error('Signup error', err);
      }
    });
  }
}
