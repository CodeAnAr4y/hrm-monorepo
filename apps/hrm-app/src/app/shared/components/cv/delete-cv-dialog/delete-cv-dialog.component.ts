import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent, ButtonSize, ButtonTextColor, ButtonVariant } from '@hrm-monorepo/hrm-lib';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Cv } from '../../../../core/models/core.model';

@Component({
  selector: 'app-delete-user-dialog',
  imports: [
    ButtonComponent,
    FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatIcon,
    ReactiveFormsModule
  ],
  templateUrl: './delete-cv-dialog.component.html',
  styleUrl: './delete-cv-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteCvDialogComponent {
  private dialogRef = inject(MatDialogRef<DeleteCvDialogComponent>);
  public data: Cv = inject(MAT_DIALOG_DATA);

  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonTextColor = ButtonTextColor;

  close() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close(1);
  }
}
