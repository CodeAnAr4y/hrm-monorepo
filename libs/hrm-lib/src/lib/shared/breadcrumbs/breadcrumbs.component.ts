import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'lib-breadcrumbs',
  standalone: true,
  imports: [BreadcrumbComponent, BreadcrumbItemDirective, MatIcon, TranslatePipe],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  // userAlias = input('userEmail');
}
