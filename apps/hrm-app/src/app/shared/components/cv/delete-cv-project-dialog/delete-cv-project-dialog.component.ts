import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ButtonTextColor, ButtonVariant, ButtonSize, ButtonComponent } from '@hrm-monorepo/hrm-lib';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-delete-cv-project-dialog',
  imports: [
    MatDialogContent,
    MatIcon,
    ButtonComponent,
    MatDialogActions
  ],
  templateUrl: './delete-cv-project-dialog.component.html',
  styleUrl: './delete-cv-project-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteCvProjectDialogComponent {
  private dialogRef = inject(MatDialogRef<DeleteCvProjectDialogComponent>);
  public data = inject<{ id: string; name: string }>(MAT_DIALOG_DATA);

  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonTextColor = ButtonTextColor;

  close() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
