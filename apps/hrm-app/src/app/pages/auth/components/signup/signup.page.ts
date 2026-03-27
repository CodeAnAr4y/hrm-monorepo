import { Component, inject } from '@angular/core';
import { ButtonComponent, InputComponent } from '@hrm-monorepo/hrm-lib';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonVariant } from '@hrm-monorepo/hrm-lib';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  imports: [
    ButtonComponent,
    FormsModule,
    InputComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './signup.page.html',
  styleUrl: './signup.page.scss',
  standalone: true,
})
export class SignupPage {
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
