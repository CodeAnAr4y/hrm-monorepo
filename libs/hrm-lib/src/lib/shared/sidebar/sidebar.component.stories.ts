import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { SidebarComponent } from './sidebar.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserRole } from 'apps/hrm-app/src/app/core/models/core.model';

const meta: Meta<SidebarComponent> = {
  title: 'UI/Sidebar',
  component: SidebarComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([]),
        importProvidersFrom(TranslateModule.forRoot()),
        provideAppInitializer(() => {
          const translate = inject(TranslateService);
          translate.setTranslation('en', {
            'sidebar': {
              'tabs': {
                'employees': 'Employees',
                'projects': 'Projects',
                'cvs': 'CVs',
                'departments': 'Departments',
                'positions': 'Positions',
                'skills': 'Skills',
                'languages': 'Languages'
              },
              'menu': {
                'profile': 'My Profile',
                'settings': 'Settings',
                'logout': 'Logout'
              }
            }
          });

          translate.use('en');
        }),
      ],
    }),
  ],
  args: {
    user: {
      id: '1',
      email: 'admin@company.com',
      role: UserRole.Admin,
      profile: {
        full_name: 'Ivan Ivanov',
        avatar: ''
      }
    } as any
  }
};

export default meta;
type Story = StoryObj<SidebarComponent>;

export const Admin: Story = {};

export const User: Story = {
  args: {
    user: {
      id: '2',
      email: 'user@company.com',
      role: UserRole.Employee,
      profile: {
        full_name: 'Jane Doe',
        avatar: null
      }
    } as any
  }
};

export const Collapsed: Story = {
  parameters: {
    localStorage: { navigation: 'false' }
  },
  play: async () => {
    localStorage.setItem('navigation', 'false');
    window.dispatchEvent(new Event('storage'));
  }
};
