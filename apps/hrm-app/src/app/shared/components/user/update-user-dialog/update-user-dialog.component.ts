import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  ButtonComponent,
  ButtonSize,
  ButtonTextColor,
  ButtonVariant,
  InputComponent,
  SelectComponent,
  SelectOption
} from '@hrm-monorepo/hrm-lib';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ConstantsService } from '../../../../services/shared/constants/constants.service';
import { User, UserRole } from '../../../../core/models/core.model';
import { map } from 'rxjs/operators';
import { UserService } from '../../../../services/shared/user/user.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-update-user-dialog',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    InputComponent,
    MatDialogActions,
    MatDialogContent,
    MatIcon,
    ReactiveFormsModule,
    SelectComponent,
    TranslateModule
  ],
  templateUrl: './update-user-dialog.component.html',
  styleUrl: './update-user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateUserDialogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<UpdateUserDialogComponent>);
  private constantsService = inject(ConstantsService);
  private cdr = inject(ChangeDetectorRef);
  private userService = inject(UserService);

  public authUser = this.userService.authenticatedUser;

  public data: User = inject(MAT_DIALOG_DATA);

  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonTextColor = ButtonTextColor;

  positionOptions: SelectOption[] = [];
  departmentOptions: SelectOption[] = [];
  roleOptions: SelectOption[] = [];

  public userForm = new FormGroup({
    email: new FormControl<string | null>({
      value: this.data.email,
      disabled: this.authUser().id !== this.data.id
    }, [Validators.required]),
    password: new FormControl<string | null>({ value: null, disabled: this.authUser().id !== this.data.id }),
    firstName: new FormControl<string | null>(this.data.profile?.first_name || null, [Validators.required]),
    lastName: new FormControl<string | null>(this.data.profile?.last_name || null, [Validators.required]),
    department: new FormControl<string | null>(this.data.department?.id || null, [Validators.required]),
    position: new FormControl<string | null>(this.data.position?.id || null, [Validators.required]),
    role: new FormControl<UserRole | null>(this.data.role, [Validators.required])
  });

  ngOnInit() {
    this.initSelectOptions();
  }

  public initSelectOptions(): void {
    this.roleOptions = Object.values(UserRole).map(m => ({
      label: m,
      value: m
    }));

    this.constantsService.loadDepartmentsList().pipe(
      map(departments => departments.map(
        dep => ({
          label: dep.name,
          value: dep.id
        } as SelectOption))))
      .subscribe(departments => {
        this.departmentOptions = departments;
        this.cdr.markForCheck();
      });
    this.constantsService.loadPositionsList().pipe(
      map(positions => positions.map(
        pos => ({
          label: pos.name,
          value: pos.id
        } as SelectOption))))
      .subscribe(positions => {
        this.positionOptions = positions;
        this.cdr.markForCheck();
      });
  }

  close() {
    this.dialogRef.close();
  }

  confirm() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.getRawValue());
    }
  }
}
