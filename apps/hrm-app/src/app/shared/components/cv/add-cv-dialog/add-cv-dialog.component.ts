import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  ButtonComponent,
  ButtonSize,
  ButtonTextColor,
  ButtonVariant,
  InputComponent,
  SelectOption,
  TextAreaComponent
} from '@hrm-monorepo/hrm-lib';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ConstantsService } from '../../../../services/shared/constants/constants.service';
import { UserRole } from '../../../../core/models/core.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-cv-dialog',
  imports: [
    ButtonComponent,
    FormsModule,
    InputComponent,
    MatDialogActions,
    MatDialogContent,
    MatIcon,
    ReactiveFormsModule,
    TextAreaComponent
  ],
  templateUrl: './add-cv-dialog.component.html',
  styleUrl: './add-cv-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCvDialogComponent {
  private dialogRef = inject(MatDialogRef<AddCvDialogComponent>);

  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonTextColor = ButtonTextColor;

  public cvForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    education: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null, [Validators.required]),
  });


  close() {
    this.dialogRef.close();
  }

  confirm() {
    if (this.cvForm.valid) {
      this.dialogRef.close(this.cvForm.value);
    }
  }
}
