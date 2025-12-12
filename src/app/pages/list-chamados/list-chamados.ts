// import { Component, inject, OnInit, ChangeDetectorRef, computed } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { TableModule } from 'primeng/table';
// import { ButtonModule } from 'primeng/button';
// import { ProgressSpinnerModule } from 'primeng/progressspinner';
// import { DialogModule } from 'primeng/dialog';
// import { InputTextModule } from 'primeng/inputtext';
// import { AutoCompleteModule } from 'primeng/autocomplete';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// import { ChamadosService } from '../../core/services/chamados';
// import { ChamadoModel } from '../../core/models/chamado.model';
// import { SearchService } from '../../core/services/search.service';

// @Component({
//   selector: 'app-list-chamados',
//   standalone: true,
//   imports: [
//     CommonModule,
//     TableModule,
//     ButtonModule,
//     ProgressSpinnerModule,
//     DialogModule,
//     FormsModule,
//     InputTextModule,
//     AutoCompleteModule,
//   ],
//   templateUrl: './list-chamados.html',
//   styleUrls: ['./list-chamados.css'],
// })
// export class ListChamados implements OnInit {
//   private router = inject(Router);
//   private service = inject(ChamadosService);
//   private cdr = inject(ChangeDetectorRef);
//   private searchService = inject(SearchService);

//   chamados: ChamadoModel[] = [];
//   loading = true;

//   filteredChamados = computed(() => {
//     const term = this.searchService.searchTerm().toLowerCase();

//     return this.chamados.filter(
//       (c) =>
//         c.titulo.toLowerCase().includes(term) ||
//         c.descricao.toLowerCase().includes(term) ||
//         c.categoria.toLowerCase().includes(term)
//     );
//   });

//   cols = [
//     { field: 'id', header: 'ID' },
//     { field: 'titulo', header: 'Título' },
//     { field: 'descricao', header: 'Descrição' },
//     { field: 'categoria', header: 'Categoria' },
//   ];

//   ngOnInit(): void {
//     this.loadChamados();
//   }

//   loadChamados(): void {
//     this.loading = true;

//     this.service.list().subscribe({
//       next: (data) => {
//         this.chamados = data ?? [];
//         this.loading = false;
//         this.cdr.detectChanges();
//       },
//       error: (err) => {
//         console.error('Erro ao carregar chamados:', err);
//         this.chamados = [];
//         this.loading = false;
//         this.cdr.detectChanges();
//       },
//     });
//   }

//   goToCreate(): void {
//     this.router.navigate(['/chamados/novo']);
//   }
// }

import { Component, inject, OnInit, ChangeDetectorRef, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ChamadosService } from '../../core/services/chamados';
import { ChamadoModel } from '../../core/models/chamado.model';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-list-chamados',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    AutoCompleteModule,
  ],
  templateUrl: './list-chamados.html',
  styleUrls: ['./list-chamados.css'],
})
export class ListChamados implements OnInit {
  private router = inject(Router);
  private service = inject(ChamadosService);
  private cdr = inject(ChangeDetectorRef);
  private searchService = inject(SearchService);

  chamados: ChamadoModel[] = [];
  loading = true;

  // computed que devolve o array já filtrado
  filteredChamados = computed(() => {
    const term = this.searchService.searchTerm().trim().toLowerCase();
    if (!term) return this.chamados;
    return this.chamados.filter(
      (c) =>
        c.titulo.toLowerCase().includes(term) ||
        c.descricao.toLowerCase().includes(term) ||
        c.categoria.toLowerCase().includes(term)
    );
  });

  cols = [
    { field: 'id', header: 'ID' },
    { field: 'titulo', header: 'Título' },
    { field: 'descricao', header: 'Descrição' },
    { field: 'categoria', header: 'Categoria' },
  ];

  ngOnInit(): void {
    this.loadChamados();

    // effect reage a mudanças em searchTerm (signal) — chama detectChanges para atualizar
    effect(() => {
      // ler o valor da signal faz o effect "assinar" automaticamente
      const _v = this.searchService.searchTerm();
      // força change detection quando o termo mudar
      // evita executar detectChanges durante a carga inicial enquanto loading=true
      this.cdr.detectChanges();
    });
  }

  loadChamados(): void {
    this.loading = true;

    this.service.list().subscribe({
      next: (data) => {
        this.chamados = data ?? [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar chamados:', err);
        this.chamados = [];
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  goToCreate(): void {
    this.router.navigate(['/chamados/novo']);
  }
}
