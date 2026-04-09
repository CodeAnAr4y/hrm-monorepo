import { ChangeDetectionStrategy, Component, computed, input, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ADMIN_LINKS, USER_LINKS } from './sidebar.constants';
import { User, UserRole, Profile } from 'apps/hrm-app/src/app/core/models/core.model';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  user = input<User | null>(null);

  isAdmin = computed(()=> this.user()?.role === UserRole.Admin);

  isOpen = signal(localStorage.getItem('navigation') === 'true');

  navLinks = computed(() => this.isAdmin() ? ADMIN_LINKS : USER_LINKS);

  constructor() {
    effect(() => {
      console.log(this.user())
    });
  }

  toggleNavigation() {
    this.isOpen.update(value => {
      const newValue = !value;
      localStorage.setItem('navigation', String(newValue));
      return newValue;
    });
  }
}
