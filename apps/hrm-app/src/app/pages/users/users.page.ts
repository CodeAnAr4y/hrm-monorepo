import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SidebarComponent, TableComponent, UsersTableData } from '@hrm-monorepo/hrm-lib';
import { UserService } from '../../services/shared/user/user.service';
import { User } from '../../core/models/core.model';
import { TableHeader } from '@hrm-monorepo/hrm-lib';

@Component({
  selector: 'app-users-page',
  imports: [
    SidebarComponent,
    TableComponent
  ],
  templateUrl: './users.page.html',
  styleUrl: './users.page.css'
})
export class UsersPage implements OnInit {
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
        position: user.position?.name || '—',
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
          this.employees.set(users);
          console.log('success', this.employees());
        },
        error: error => {
          console.error(error);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      }
    );
  }
}
