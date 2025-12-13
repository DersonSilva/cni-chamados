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
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { signal } from '@angular/core';

import { ChamadosService } from '../../core/services/chamados';
import { ChamadoModel } from '../../core/models/chamado.model';
import { SearchService } from '../../core/services/search.service';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

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
    ConfirmDialog,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './list-chamados.html',
  styleUrls: ['./list-chamados.css'],
})
export class ListChamados implements OnInit {
  private router = inject(Router);
  private service = inject(ChamadosService);
  private cdr = inject(ChangeDetectorRef);
  private searchService = inject(SearchService);
  private confirmation = inject(ConfirmationService);
  private messageService = inject(MessageService);

  chamados = signal<ChamadoModel[]>([]);
  loading = true;
  editingChamado: ChamadoModel | null = null;
  filteredCategorias: any[] = [];
  displayDialog = false;

  filteredChamados = computed(() => {
    const term = this.searchService.searchTerm().trim().toLowerCase();
    const chamados = this.chamados();

    if (!term) return chamados;

    return chamados.filter(
      (c) =>
        c.titulo.toLowerCase().includes(term) ||
        c.descricao.toLowerCase().includes(term) ||
        c.categoria.toLowerCase().includes(term)
    );
  });

  searchEffect = effect(() => {
    const _v = this.searchService.searchTerm();
    this.cdr.detectChanges();
  });

  cols = [
    { field: 'id', header: 'ID' },
    { field: 'titulo', header: 'Título' },
    { field: 'descricao', header: 'Descrição' },
    { field: 'categoria', header: 'Categoria' },
  ];

  ngOnInit(): void {
    this.loadChamados();
  }

  loadChamados(): void {
    this.loading = true;
    this.service.list().subscribe({
      next: (data) => {
        this.chamados.set(data ?? []);
        this.loading = false;
      },
      error: () => {
        this.chamados.set([]);
        this.loading = false;
      },
    });
  }

  goToCreate(): void {
    this.router.navigate(['/chamados/novo']);
  }

  openEdit(chamado: ChamadoModel) {
    this.editingChamado = { ...chamado };
    this.displayDialog = true;
  }

  filterCategoria(event: any) {
    const categorias = ['Suporte', 'Financeiro', 'TI', 'RH'];
    this.filteredCategorias = categorias.filter((c) =>
      c.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  saveEdit() {
    if (!this.editingChamado) return;

    this.service.update(this.editingChamado);

    this.chamados.update((list) =>
      list.map((c) => (c.id === this.editingChamado!.id ? this.editingChamado! : c))
    );

    this.displayDialog = false;
    this.editingChamado = null;

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Chamado atualizado!',
    });
  }
  confirmDelete(chamado: ChamadoModel) {
    this.confirmation.confirm({
      message: `"${chamado.titulo}"? Esta ação é irreversível.`,
      header: 'Deseja realmente excluir?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.service.remove(chamado.id!);
        this.chamados.update((list) => list.filter((c) => c.id !== chamado.id));
        this.messageService.add({
          severity: 'success',
          summary: 'Excluído',
          detail: `${chamado.titulo} excluído com sucesso.`,
        });
      },
      reject: () => {},
    });
  }
}
