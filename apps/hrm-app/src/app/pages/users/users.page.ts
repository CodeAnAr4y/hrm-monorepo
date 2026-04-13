import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { BreadcrumbsComponent, SidebarComponent, TableComponent, UsersTableData } from '@hrm-monorepo/hrm-lib';
import { UserService } from '../../services/shared/user/user.service';
import { User } from '../../core/models/core.model';
import { TableHeader } from '@hrm-monorepo/hrm-lib';
import { AuthService } from '../../services/core/auth/auth.service';

@Component({
  selector: 'app-users-page',
  imports: [
    TableComponent,
    SidebarComponent,
    BreadcrumbsComponent
  ],
  templateUrl: './users.page.html',
  styleUrl: './users.page.scss'
})
export class UsersPage implements OnInit {
  public userService = inject(UserService);
  public authService = inject(AuthService);
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
    const user = this.userService.user();
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

  public employees = signal<User[]>([]);
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

  ngOnInit() {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe({
      next: users => {
        const currentUserId = this.userService.user().id;
        const otherEmployees = users.filter(u => u.id !== currentUserId);
        this.employees.set(otherEmployees);
      },
      error: (err) => console.error(err),
      complete: () => this.isLoading.set(false)
    });
  }
}
