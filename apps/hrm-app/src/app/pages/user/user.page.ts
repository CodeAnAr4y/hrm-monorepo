import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { TabsComponent } from '@hrm-monorepo/hrm-lib';
import { UserService } from '../../services/shared/user/user.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [TabsComponent, RouterOutlet],
  templateUrl: './user.page.html',
  styleUrl: './user.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPage {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private translate = inject(TranslateService);

  public userId = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('userId')),
      filter((id): id is string => !!id)
    )
  );

  public user = toSignal(
    toObservable(this.userId).pipe(
      switchMap(id => this.userService.getUserById(id!))
    )
  );

  public tabs = computed(() => {
    const id = this.userId();
    if (!id) return [];

    return [
      { title: this.translate.instant('user.tabs.profile'), link: `/users/${id}` },
      { title: this.translate.instant('user.tabs.skills'), link: `/users/${id}/skills` },
      { title: this.translate.instant('user.tabs.languages'), link: `/users/${id}/languages` }
    ];
  });
}
