import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BreadcrumbsComponent, SidebarComponent, TabsComponent } from '@hrm-monorepo/hrm-lib';
import { UserService } from '../../services/shared/user/user.service';
import { RouterOutlet, ActivatedRoute } from '@angular/router'; // Добавили ActivatedRoute
import { AuthService } from '../../services/core/auth/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators'; // Для превращения параметров в сигнал

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    TabsComponent,
    RouterOutlet
  ],
  templateUrl: './user.page.html',
  styleUrl: './user.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPage {
  private route = inject(ActivatedRoute);

  public activeUserId = toSignal(
    this.route.paramMap.pipe(map(params => params.get('id')))
  );

  public tabs = computed(() => {
    const id = this.activeUserId();
    if (!id) return [];

    return [
      { title: 'Profile', link: `/users/${id}` },
      { title: 'Skills', link: `/users/${id}/skills` },
      { title: 'Languages', link: `/users/${id}/languages` }
    ];
  });
}
