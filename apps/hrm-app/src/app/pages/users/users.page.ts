import { Component, computed, inject, signal } from '@angular/core';
import { TableComponent, TableHeader, UsersTableData } from '@hrm-monorepo/hrm-lib';
import { UserService } from '../../services/shared/user/user.service';
import { CreateUserInput, UpdateUserInput, User } from '../../core/models/core.model';
import { CREATE_NEW_STORYFILE_REQUEST } from 'storybook/internal/core-events';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../../shared/components/user/add-user-dialog/add-user-dialog.component';
import { AdminService } from '../../services/shared/admin/admin.service';
import { SnackBarService } from '../../services/shared/snack-bar/snack-bar.service';
import { DeleteUserDialogComponent } from '../../shared/components/user/delete-user-dialog/delete-user-dialog.component';
import { Router } from '@angular/router';
import { UpdateUserDialogComponent } from '../../shared/components/user/update-user-dialog/update-user-dialog.component';

@Component({
  selector: 'app-users-page',
  imports: [
    TableComponent
  ],
  templateUrl: './users.page.html',
  styleUrl: './users.page.scss'
})
export class UsersPage {
  public userService = inject(UserService);
  private adminService = inject(AdminService);
  private snackBarService = inject(SnackBarService);
  private router = inject(Router);

  public isAdmin = this.userService.isAdmin;
  private dialog = inject(MatDialog);

  public columns = signal<TableHeader[]>([
    { title: '', sourceName: 'avatar', sortable: false, type: 'image' },
    { title: 'First Name', sourceName: 'firstName', sortable: true },
    { title: 'Last Name', sourceName: 'lastName', sortable: true },
    { title: 'Email', sourceName: 'email', sortable: true },
    { title: 'Department', sourceName: 'department', sortable: true },
    { title: 'Position', sourceName: 'position', sortable: true },
    { title: '', sourceName: 'actions', sortable: false, type: 'action' }
  ]);
  public selfUserTableData = computed((): UsersTableData | undefined => {
    const authUser = this.userService.authenticatedUser();
    const user = this.userService.users().filter(user => user.id === authUser.id)[0];
    if (!user || !user.id) return undefined;

    return {
      id: user.id,
      avatar: user.profile?.avatar ?? '',
      firstName: user.profile?.first_name ?? '—',
      lastName: user.profile?.last_name ?? '—',
      email: user.email,
      department: user.department?.name || '—',
      position: user.position?.name || '—'
    };
  });

  public employees = computed((): User[] => {
    const currentUserId = this.userService.authenticatedUser().id;
    return this.userService.users().filter(u => u.id !== currentUserId);
  });

  public employeesTable = computed((): UsersTableData[] => {
    return this.employees().map((user) => {
      return {
        id: user.id,
        avatar: user.profile.avatar ?? '',
        firstName: user.profile.first_name ?? '—',
        lastName: user.profile.last_name ?? '—',
        email: user.email,
        department: user.department?.name || '—',
        position: user.position?.name || '—'
      };
    });
  });
  public isLoading = signal<boolean>(true);

  public openCreateUserDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '60vw',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const createUserData: CreateUserInput = {
          auth: { email: result.email, password: result.password },
          profile: { first_name: result.firstName, last_name: result.lastName },
          cvsIds: [],
          departmentId: result.department,
          positionId: result.position,
          role: result.role
        };

        this.adminService.createUser(createUserData)
          .subscribe({
            next: user => {
              this.router.navigate(['/users', user.id]).then(() => {
                this.snackBarService.openSnackBar(`User was successfully created!`);
              });
            },
            error: error => this.snackBarService.openSnackBar('Error occured ' + error.message)
          });
      }
    });
  }

  public openUpdateUserDialog(id: string) {
    const user = this.userService.users().filter(user => user.id === id)[0];

    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      width: '60vw',
      panelClass: 'custom-dialog-container',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updateUserData: UpdateUserInput = {
          userId: user.id,
          cvsIds: [],
          departmentId: result.department,
          positionId: result.position,
          role: result.role
        };

        this.adminService.updateUser(updateUserData)
          .subscribe({
            next: () => {
              this.snackBarService.openSnackBar(`User was successfully updated!`);
              this.updateUsersTable()
            },
            error: error => this.snackBarService.openSnackBar('Error occured ' + error.message)
          });
      }
    });
  }

  public openDeleteUserDialog(id: string) {
    const user = this.userService.users().filter(user => user.id === id)[0];

    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '40vw',
      panelClass: 'custom-dialog-container',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deleteUser(user.id)
          .subscribe({
            next: () => {
              this.snackBarService.openSnackBar(`User deleted!`)
              this.updateUsersTable();
            },
            error: error => this.snackBarService.openSnackBar('Error occured ' + error.message)
          });
      }
    });
  }

  public updateUsersTable(){
    this.userService.getUsers().subscribe()
  }

}
