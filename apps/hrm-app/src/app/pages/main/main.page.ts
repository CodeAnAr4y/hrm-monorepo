import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbsComponent, SidebarComponent, TableComponent } from '@hrm-monorepo/hrm-lib';
import { UserService } from '../../services/shared/user/user.service';
import { AuthService } from '../../services/core/auth/auth.service';

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
    BreadcrumbsComponent,
    SidebarComponent,
  ],
  templateUrl: './main.page.html',
  styleUrl: './main.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage {
  public userService = inject(UserService);
  public authService = inject(AuthService);
}
