import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Department, Position, UserRole } from '../../../core/models/core.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConstantsService } from '../../../services/shared/constants/constants.service';
import {
  ButtonComponent,
  ButtonSize,
  ButtonTextColor,
  ButtonVariant,
  InputComponent,
  SelectComponent
} from '@hrm-monorepo/hrm-lib';
import { MatIcon } from '@angular/material/icon';
import { SelectOption } from '@hrm-monorepo/hrm-lib';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-user-dialog',
  imports: [
    ButtonComponent,
    FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatIcon,
    ReactiveFormsModule,
    SelectComponent,
    InputComponent
  ],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserDialogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<AddUserDialogComponent>);
  private constantsService = inject(ConstantsService);
  private cdr = inject(ChangeDetectorRef);

  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonTextColor = ButtonTextColor;

  positionOptions: SelectOption[] = [];
  departmentOptions: SelectOption[] = [];
  roleOptions: SelectOption[] = [];

  public userForm = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, [Validators.required]),
    firstName: new FormControl<string | null>(null, [Validators.required]),
    lastName: new FormControl<string | null>(null, [Validators.required]),
    department: new FormControl<Department | null>(null, [Validators.required]),
    position: new FormControl<Position | null>(null, [Validators.required]),
    role: new FormControl<UserRole | null>(UserRole.Employee, [Validators.required])
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
      this.dialogRef.close(this.userForm.value);
    }
  }

}
