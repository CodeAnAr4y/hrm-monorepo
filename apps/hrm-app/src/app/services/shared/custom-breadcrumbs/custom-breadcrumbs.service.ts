import { effect, inject, Injectable } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { UserService } from '../user/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomBreadcrumbsService {
  private breadcrumbService = inject(BreadcrumbService);
  private userService = inject(UserService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      const users = this.userService.users();
      if (users.length > 0) {
        this.updateLabel(users);
      }
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateLabel(this.userService.users());
    });
  }

  private updateLabel(users: any[]): void {
    const id = this.getRecursiveParam(this.router.routerState.root.snapshot, 'id');

    if (id && users.length > 0) {
      const activeUser = users.find(u => u.id === id);
      if (activeUser) {
        const label = activeUser.profile?.full_name || activeUser.email;
        this.breadcrumbService.set('@userEmail', label);
      }
    }
  }

  private getRecursiveParam(snapshot: any, paramName: string): string | null {
    if (snapshot.paramMap.has(paramName)) {
      return snapshot.paramMap.get(paramName);
    }
    for (const child of snapshot.children) {
      const result = this.getRecursiveParam(child, paramName);
      if (result) return result;
    }
    return null;
  }
}
