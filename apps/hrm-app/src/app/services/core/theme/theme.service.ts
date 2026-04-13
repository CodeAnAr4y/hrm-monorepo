import { Injectable, effect, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<string>(localStorage.getItem('theme') || 'default');

  constructor() {
    effect(() => {
      const currentTheme = this.theme();
      localStorage.setItem('theme', currentTheme);
      this.applyTheme(currentTheme);
    });
  }

  private applyTheme(theme: string) {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');

    if (theme === 'default') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(isDark ? 'dark' : 'light');
    } else {
      root.classList.add(theme);
    }
  }
}
