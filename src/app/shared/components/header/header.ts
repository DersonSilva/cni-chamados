import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../../core/services/search.service';
import { ThemeService } from '../../../core/services/theme.service';
import { ButtonModule } from 'primeng/button';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './header.html',
})
export class HeaderComponent implements OnInit {
  private searchService = inject(SearchService);
  private themeService = inject(ThemeService);
  private router = inject(Router);

  mobileOpen = signal(false);
  currentTheme: 'light' | 'dark' = 'light';
  showSearch = signal(true);

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
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showSearch.set(event.url !== '/chamados/novo');
        this.mobileOpen.set(false);
      });
  }
}
