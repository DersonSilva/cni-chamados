import { Injectable } from '@angular/core';

type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'theme';
  private readonly DARK_CLASS = 'app-dark';

  toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.toggle(this.DARK_CLASS);

    localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
  }

  initTheme() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const html = document.documentElement;

    if (saved === 'dark') {
      html.classList.add(this.DARK_CLASS);
    } else {
      html.classList.remove(this.DARK_CLASS);
    }
  }

  getCurrentTheme(): 'light' | 'dark' {
    const html = document.documentElement;
    return html.classList.contains(this.DARK_CLASS) ? 'dark' : 'light';
  }
}
