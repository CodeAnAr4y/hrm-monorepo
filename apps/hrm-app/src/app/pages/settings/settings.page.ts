import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SelectComponent, SelectOption } from '@hrm-monorepo/hrm-lib';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from '../../services/core/theme/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    SelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './settings.page.html',
  styleUrl: './settings.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPage implements OnInit {
  private translate = inject(TranslateService);
  private themeService = inject(ThemeService);

  appearanceControl = new FormControl<string>(this.themeService.theme(), { nonNullable: true });
  languageControl = new FormControl<string>(localStorage.getItem('lang') || 'en', { nonNullable: true });

  public languageOptions: SelectOption[] = [
    { value: 'ru', label: 'Русский' }, { value: 'en', label: 'English' }
  ];
  public appearanceOptions: SelectOption[] = [
    { value: 'default', label: this.translate.instant('settings.appearance.options.default') },
    { value: 'dark', label: this.translate.instant('settings.appearance.options.dark') },
    { value: 'light', label: this.translate.instant('settings.appearance.options.light') }
  ];

  public ngOnInit(): void {
    this.appearanceControl.valueChanges.subscribe(value => {
      this.themeService.theme.set(value);
    });

    this.languageControl.valueChanges.subscribe(value => {
      this.translate.use(value);
      localStorage.setItem('lang', value);

      this.updateAppearanceLabels();
    });
  }

  private updateAppearanceLabels(): void {
    this.appearanceOptions = [
      { value: 'default', label: this.translate.instant('settings.appearance.options.default') },
      { value: 'dark', label: this.translate.instant('settings.appearance.options.dark') },
      { value: 'light', label: this.translate.instant('settings.appearance.options.light') }
    ];
  }
}
