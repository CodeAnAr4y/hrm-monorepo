import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
import { MatIcon } from '@angular/material/icon';
import {
  CustomBreadcrumbsService
} from 'apps/hrm-app/src/app/services/shared/custom-breadcrumbs/custom-breadcrumbs.service';

@Component({
  selector: 'lib-breadcrumbs',
  imports: [
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    MatIcon
  ],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  private customBreadcrumbService = inject(CustomBreadcrumbsService);
}
