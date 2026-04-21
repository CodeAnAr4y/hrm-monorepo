import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import {
  AvatarComponent,
  ButtonComponent, ButtonSize,
  ButtonVariant,
  InputComponent,
  SelectComponent,
  SelectOption
} from '@hrm-monorepo/hrm-lib';
import { UserService } from '../../../../services/shared/user/user.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SnackBarService } from '../../../../services/shared/snack-bar/snack-bar.service';
import {
  Department,
  Position,
  UpdateProfileInput,
  UpdateUserInput,
  UserRole
} from '../../../../core/models/core.model';
import { ConstantsService } from '../../../../services/shared/constants/constants.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AvatarComponent, DatePipe, InputComponent, ReactiveFormsModule, SelectComponent, ButtonComponent, TranslateModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);
  private constantsService = inject(ConstantsService);
  private fb = inject(FormBuilder);
  private snackBarService = inject(SnackBarService);
  private translate = inject(TranslateService);

  public selectedUser = computed(() => this.userService.selectedUser());

  public isOwnProfile = computed(() => this.selectedUser().id === this.userService.authenticatedUser().id);
  public isAdmin = this.userService.isAdmin;

  public profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    department: [''],
    position: ['']
  });

  departments = signal<Department[]>([]);
  positions = signal<Position[]>([]);

  departmentOptions = computed((): SelectOption[] => {
    return this.departments().map(department => {
      return { value: department.id, label: department.name };
    });
  });

  positionOptions = computed((): SelectOption[] => {
    return this.positions().map(position => {
      return { value: position.id, label: position.name };
    });
  });

  protected readonly ButtonVariant = ButtonVariant;
  protected readonly ButtonSize = ButtonSize;


  constructor() {
    effect(() => {
      const user = this.selectedUser();
      this.profileForm.patchValue({
        firstName: user.profile.first_name,
        lastName: user.profile.last_name,
        department: user.department?.id,
        position: user.position?.id
      });

      if (this.isOwnProfile() || this.isAdmin()) {
        this.profileForm.enable();
      } else {
        this.profileForm.disable();
      }
    });
  }

  public ngOnInit() {
    this.loadDepartments();
    this.loadPositions();
  }

  private loadDepartments() {
    this.constantsService.loadDepartmentsList().subscribe(departments => this.departments.set(departments));
  }

  private loadPositions() {
    this.constantsService.loadPositionsList().subscribe(positions => this.positions.set(positions));
  }

  updateUserDataAndProfile() {
    if (this.profileForm.invalid) return;

    const userData: UpdateUserInput = {
      userId: this.selectedUser().id,
      departmentId: this.profileForm.value.department || '',
      positionId: this.profileForm.value.position || ''
    };
    this.userService.updateUserData(userData).subscribe();

    const profileData: UpdateProfileInput = {
      userId: this.selectedUser().id,
      first_name: this.profileForm.value.firstName || '',
      last_name: this.profileForm.value.lastName || ''
    };
    this.userService.updateUserProfile(profileData).subscribe(res =>
      this.snackBarService.openSnackBar(this.translate.instant('user.profile.messages.updateSuccess'))
    );

  }

  uploadAvatar(file: File) {
    if (file.size > 0.5 * 1024 * 1024) {
      this.snackBarService.openSnackBar(this.translate.instant('user.profile.messages.fileTooLarge'));
      return;
    }
    this.userService.uploadAvatar(file, this.selectedUser().id).subscribe({
      next: () => {
        alert(this.translate.instant('user.profile.messages.avatarUpdated'));
      },
      error: (err) => console.error(err)
    });
  }
}
