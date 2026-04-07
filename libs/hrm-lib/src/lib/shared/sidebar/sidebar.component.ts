import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ADMIN_LINKS, USER_LINKS } from './sidebar.constants';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  isAdmin = signal(true);

  isOpen = signal(localStorage.getItem('navigation') === 'true');

  navLinks = computed(() => this.isAdmin() ? ADMIN_LINKS : USER_LINKS);

  toggleNavigation() {
    this.isOpen.update(value => {
      const newValue = !value;
      localStorage.setItem('navigation', String(newValue));
      return newValue;
    });
  }
}
