import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { SidebarComponent, TabsComponent } from '@hrm-monorepo/hrm-lib';
import { AuthService } from '../../services/core/auth/auth.service';
import { UserService } from '../../services/shared/user/user.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [
    SidebarComponent,
    TabsComponent,
    RouterOutlet
  ],
  templateUrl: './user.page.html',
  styleUrl: './user.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPage {
  public userService = inject(UserService);
  public authService = inject(AuthService);
  public userId = computed(()=>this.userService.user().id)


  public tabs : { title: string; link: string }[] = [
    { title: 'Profile', link: `/users/${this.userId()}` },
    { title: 'Skills', link: `/users/${this.userId()}/skills` },
    { title: 'Languages', link: `/users/${this.userId()}/languages` }
  ]

  logoutUser() {
    this.authService.logout()
  }
}
