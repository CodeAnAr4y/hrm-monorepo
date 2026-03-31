import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, InputComponent, ButtonVariant } from '@hrm-monorepo/hrm-lib';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/core/auth/auth.service';

@Component({
  selector: 'app-reset-password-page',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    RouterLink
  ],
  templateUrl: './reset-password.page.html',
  styleUrl: './reset-password.page.scss',
  standalone: true
})
export class ResetPasswordPage implements OnInit {
  protected readonly ButtonVariant = ButtonVariant;
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  token: string | null = null;

  form = this.fb.nonNullable.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  submit() {
    if (this.form.invalid) return;

    const { password, confirmPassword } = this.form.getRawValue();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    if (!this.token) {
      console.error('No token provided');
      return;
    }

    this.auth.resetPassword({ password, token: this.token }).subscribe({
      next: () => {
        console.log('Password reset successful');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Reset password error', err);
      }
    });
  }
}
