import { Component, computed, inject, signal } from '@angular/core';
import { TableComponent, TableHeader, UsersTableData } from '@hrm-monorepo/hrm-lib';
import { UserService } from '../../services/shared/user/user.service';
import { User } from '../../core/models/core.model';

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
    const user = this.userService.authenticatedUser();
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

}
