import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BreadcrumbsComponent, SidebarComponent } from '@hrm-monorepo/hrm-lib';
import { UserService } from '../../services/shared/user/user.service';
import { AuthService } from '../../services/core/auth/auth.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, startWith } from 'rxjs/operators';
import { User } from '../../core/models/core.model';

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
    BreadcrumbsComponent,
    SidebarComponent,
  ],
  templateUrl: './main.page.html',
  styleUrl: './main.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage implements OnInit {
  public userService = inject(UserService);
  public authService = inject(AuthService);
  private breadcrumbService = inject(BreadcrumbService);
  private router = inject(Router);

  private navEnd = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      startWith(null)
    )
  );

  constructor() {
    effect(() => {
      this.navEnd();
      const users = this.userService.users();
      this.refreshBreadcrumbs(users);
    });
  }
  ngOnInit() {
    this.userService.getUsers().subscribe()
  }

  private refreshBreadcrumbs(users: any[]): void {
    const userId = this.findId(this.router.routerState.snapshot.root);

    if (userId && users.length > 0) {
      const user = users.find(u => u.id === userId);
      if (user) {
        const name = user.profile?.full_name || user.email;

        this.breadcrumbService.set('@userEmail', name);
      }
    }
  }

  private findId(route: any): string | null {
    if (route.params?.['id']) return route.params['id'];
    if (route.children) {
      for (const child of route.children) {
        const id = this.findId(child);
        if (id) return id;
      }
    }
    return null;
  }
}
