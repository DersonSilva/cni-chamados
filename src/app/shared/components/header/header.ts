import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../../core/services/search.service';
import { ThemeService } from '../../../core/services/theme.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './header.html',
})
export class HeaderComponent {
  private searchService = inject(SearchService);
  private themeService = inject(ThemeService);

  private timeout: any;
  mobileOpen = signal(false);
  currentTheme: 'light' | 'dark' = 'light';

  onSearch(event: any) {
    this.searchService.searchTerm.set(event.target.value);
  }

  toggleMenu() {
    this.mobileOpen.update((v) => !v);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.updateTheme();
  }

  private updateTheme() {
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  ngOnInit() {
    this.updateTheme();
  }
}
