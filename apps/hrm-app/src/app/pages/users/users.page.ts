import { Component } from '@angular/core';
import { SidebarComponent } from '@hrm-monorepo/hrm-lib';

@Component({
  selector: 'app-users-page',
  imports: [
    SidebarComponent
  ],
  templateUrl: './users.page.html',
  styleUrl: './users.page.css',
})
export class UsersPage {}
