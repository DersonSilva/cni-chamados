import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
})
export class HeaderComponent {
  private searchService = inject(SearchService);
  private timeout: any;
  mobileOpen = signal(false);

  onSearch(event: any) {
    this.searchService.searchTerm.set(event.target.value);
  }

  toggleMenu() {
    this.mobileOpen.update((v) => !v);
  }
}
