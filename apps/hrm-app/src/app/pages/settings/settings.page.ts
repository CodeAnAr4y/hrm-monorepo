import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BreadcrumbsComponent, SidebarComponent } from '@hrm-monorepo/hrm-lib';
import { UserService } from '../../services/shared/user/user.service';
import { AuthService } from '../../services/core/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  imports: [
    BreadcrumbsComponent,
    SidebarComponent,
    TranslatePipe
  ],
  templateUrl: './settings.page.html',
  styleUrl: './settings.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPage {
  private translate = inject(TranslateService);
  public userService = inject(UserService);
  public authService = inject(AuthService);

  public changeLanguage(lang: string){
    this.translate.use(lang);
  }
}
