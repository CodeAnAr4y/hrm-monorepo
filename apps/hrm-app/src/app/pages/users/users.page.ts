import { Component, inject, OnInit, signal } from '@angular/core';
import { SidebarComponent, TableComponent } from '@hrm-monorepo/hrm-lib';
import { UserService } from '../../services/shared/user/user.service';
import { User } from '../../core/models/core.model';
import { TableHeader } from '../../../../../../libs/hrm-lib/src/lib/shared/table/table.types';

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
    { title: '', sourceName: 'avatar', sortable: false },
    { title: 'First Name', sourceName: 'first_name', sortable: true },
    { title: 'Last Name', sourceName: 'last_name', sortable: true },
    { title: 'Email', sourceName: 'email', sortable: true },
    { title: 'Department', sourceName: 'department', sortable: true },
    { title: 'Position', sourceName: 'position', sortable: true },
    { title: '', sourceName: 'action', sortable: false }
  ]);

  public employees = signal<User[]>([]);
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
