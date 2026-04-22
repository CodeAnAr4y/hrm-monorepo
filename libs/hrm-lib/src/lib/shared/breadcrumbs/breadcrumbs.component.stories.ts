import { Component } from '@angular/core';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { BreadcrumbsComponent } from '@hrm-monorepo/hrm-lib';
import { provideRouter, Router } from '@angular/router';
import { importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({ standalone: true, template: '' })
class EmptyComponent {}

const meta: Meta<BreadcrumbsComponent> = {
  title: 'UI/Breadcrumbs',
  component: BreadcrumbsComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([
          {
            path: 'dashboard',
            component: EmptyComponent,
            data: { breadcrumb: 'breadcrumbs.employee' },
            children: [
              {
                path: 'projects',
                component: EmptyComponent,
                data: { breadcrumb: 'breadcrumbs.profile' }
              }
            ]
          }
        ]),
        importProvidersFrom(TranslateModule.forRoot()),
        provideAppInitializer(async () => {
          const breadcrumbService = inject(BreadcrumbService);
          const router = inject(Router);

          breadcrumbService.set('dashboard', 'Employee');
          breadcrumbService.set('dashboard/projects', 'Profile');

          await router.navigateByUrl('/dashboard/projects');
        })
      ],
    }),
  ],
};
export default meta;

type Story = StoryObj<BreadcrumbsComponent>;
export const Default: Story = {};
