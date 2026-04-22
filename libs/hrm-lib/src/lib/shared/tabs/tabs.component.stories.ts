import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { TabsComponent } from './tabs.component';
import { provideRouter, Router } from '@angular/router';
import { importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

const meta: Meta<TabsComponent> = {
  title: 'UI/Tabs',
  component: TabsComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([
          { path: 'home', component: class {} },
          { path: 'profile', component: class {} },
          { path: 'settings', component: class {} },
        ]),
        importProvidersFrom(TranslateModule.forRoot()),
        provideAppInitializer(() => {
          const translate = inject(TranslateService);
          const router = inject(Router);

          translate.use('en');
          translate.setTranslation('en', {
            'HOME': 'Home Page',
            'PROFILE': 'User Profile',
            'SETTINGS': 'Settings'
          });

          router.navigateByUrl('/home');
        }),
      ],
    }),
  ],
  args: {
    tabs: [
      { title: 'home', link: '/home' },
      { title: 'profile', link: '/profile' },
      { title: 'settings', link: '/settings' },
    ],
    align: 'center',
    contentAlign: 'left',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 500px; padding: 20px;">
        <lib-tabs [tabs]="tabs" [align]="align" [contentAlign]="contentAlign">
          <div style="padding: 20px; color: #ccc;">
            Здесь отображается ng-content для выбранной вкладки
          </div>
        </lib-tabs>
      </div>
    `,
  }),
};

export default meta;

type Story = StoryObj<TabsComponent>;

export const Default: Story = {};

export const LeftAligned: Story = {
  args: {
    align: 'left',
  },
};
