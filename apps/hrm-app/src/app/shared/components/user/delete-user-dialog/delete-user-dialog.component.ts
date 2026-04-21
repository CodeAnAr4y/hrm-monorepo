import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent, ButtonSize, ButtonTextColor, ButtonVariant } from '@hrm-monorepo/hrm-lib';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { User } from '../../../../core/models/core.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-user-dialog',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatIcon,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteUserDialogComponent {
  private dialogRef = inject(MatDialogRef<DeleteUserDialogComponent>);
  public data: User = inject(MAT_DIALOG_DATA);

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
