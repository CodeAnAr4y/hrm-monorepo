import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ButtonTextColor, ButtonVariant, ButtonSize, ButtonComponent } from '@hrm-monorepo/hrm-lib';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-delete-project-dialog',
  imports: [
    MatDialogContent,
    MatIcon,
    ButtonComponent,
    MatDialogActions
  ],
  templateUrl: './delete-project-dialog.component.html',
  styleUrl: './delete-project-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteProjectDialogComponent {
  private dialogRef = inject(MatDialogRef<DeleteProjectDialogComponent>);
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
