import { Component, inject } from '@angular/core';
import { ButtonComponent, InputComponent } from '@hrm-monorepo/hrm-lib';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonVariant } from '@hrm-monorepo/hrm-lib';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-restore-password.page',
  imports: [
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './restore-password.page.html',
  styleUrl: './restore-password.page.scss'
})
export class RestorePasswordPage {
  protected readonly ButtonVariant = ButtonVariant;
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  submit() {
    if (this.form.invalid) return;

    console.log(this.form.getRawValue());
  }
}
