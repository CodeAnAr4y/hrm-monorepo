import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent, InputComponent } from '@hrm-monorepo/hrm-lib';
import { ButtonVariant } from '@hrm-monorepo/hrm-lib';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
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

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  submit() {
    if (this.form.invalid) return;

    console.log(this.form.getRawValue());
  }
}
