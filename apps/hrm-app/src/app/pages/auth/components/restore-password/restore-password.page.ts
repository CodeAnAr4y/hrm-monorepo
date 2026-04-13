import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, InputComponent, ButtonVariant } from '@hrm-monorepo/hrm-lib';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/core/auth/auth.service';

@Component({
  selector: 'app-restore-password-page',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    RouterLink
  ],
  templateUrl: './restore-password.page.html',
  styleUrl: './restore-password.page.scss',
  standalone: true
})
export class RestorePasswordPage {
  protected readonly ButtonVariant = ButtonVariant;
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  submit() {
    if (this.form.invalid) return;

    const { email } = this.form.getRawValue();

    this.auth.forgotPassword({ email }).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Forgot password error', err);
      }
    });
  }
}
