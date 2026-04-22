import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lib-breadcrumbs',
  standalone: true,
  imports: [BreadcrumbComponent, BreadcrumbItemDirective, MatIconModule, TranslateModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  // userAlias = input('userEmail');
}
