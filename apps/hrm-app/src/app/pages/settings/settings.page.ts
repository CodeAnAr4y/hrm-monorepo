import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { BreadcrumbsComponent, SelectComponent, SidebarComponent } from '@hrm-monorepo/hrm-lib';
import { UserService } from '../../services/shared/user/user.service';
import { AuthService } from '../../services/core/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SelectOption } from '@hrm-monorepo/hrm-lib';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from '../../services/core/theme/theme.service';

@Component({
  selector: 'app-settings',
  imports: [
    BreadcrumbsComponent,
    SidebarComponent,
    TranslatePipe,
    SelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './settings.page.html',
  styleUrl: './settings.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPage implements OnInit {
  private translate = inject(TranslateService);
  public userService = inject(UserService);
  public authService = inject(AuthService);
  private themeService = inject(ThemeService);

  appearanceControl = new FormControl<string>(this.themeService.theme(), { nonNullable: true });
  languageControl = new FormControl<string>(localStorage.getItem('lang') || 'en', { nonNullable: true });

  public languageOptions: SelectOption[] = [
    { value: 'ru', label: 'Русский' }, { value: 'en', label: 'English' }
  ];
  public appearanceOptions: SelectOption[] = [
    { value: 'default', label: 'Device settings' },
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' }
  ];

  public ngOnInit(): void {
    this.appearanceControl.valueChanges.subscribe(value => {
      this.themeService.theme.set(value);
    });

    this.languageControl.valueChanges.subscribe(value => {
      this.translate.use(value);
      localStorage.setItem('lang', value);
    });
  }
}
