import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { BreadcrumbsComponent, SidebarComponent } from '@hrm-monorepo/hrm-lib';
import { UserService } from '../../services/shared/user/user.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import { AuthService } from '../../services/core/auth/auth.service';
import { CvService } from '../../services/shared/cv/cv.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, BreadcrumbsComponent, SidebarComponent],
  templateUrl: './main.page.html',
  styleUrl: './main.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPage implements OnInit {
  public userService = inject(UserService);
  private cvService = inject(CvService);
  private breadcrumbService = inject(BreadcrumbService);
  private router = inject(Router);
  public authService = inject(AuthService);

  private routeParams = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.getAllParams(this.router.routerState.snapshot.root)),
      startWith(this.getAllParams(this.router.routerState.snapshot.root))
    )
  );

  constructor() {
    effect(() => {
      this.updateBreadcrumbs();
    });
  }

  ngOnInit() {
    this.userService.getUsers().subscribe();
    this.cvService.getCvs().subscribe();
  }

  private updateBreadcrumbs() {
    const params = this.routeParams();
    const users = this.userService.users();
    const cvs = this.cvService.userCvs();

    if (!params) return;

    const userId = params['userId'];
    const cvId = params['cvId'];

    if (userId && users.length > 0) {
      const user = users.find(u => u.id === userId);
      if (user) {
        const name = user.profile?.full_name || user.email;
        this.breadcrumbService.set('@userEmail', name);
      }
    }
    if (cvId && cvs.length > 0) {
      const cv = cvs.find(u => u.id === cvId);
      if (cv) {
        this.breadcrumbService.set('@userCv', `${cv.name}`);
      }
    }
  }

  private getAllParams(route: any, params: Record<string, string> = {}): Record<string, string> {
    if (route.params) {
      params = { ...params, ...route.params };
    }
    if (route.children) {
      for (const child of route.children) {
        params = this.getAllParams(child, params);
      }
    }
    return params;
  }
}
