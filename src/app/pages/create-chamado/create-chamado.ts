import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ChamadoModel } from '../../core/models/chamado.model';
import { RouterModule, Router } from '@angular/router';
import { ChamadosService } from '../../core/services/chamados';

@Component({
  selector: 'app-create-chamado',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    AutoCompleteModule,
    ToastModule,
    RouterModule,
  ],
  providers: [MessageService],
  templateUrl: './create-chamado.html',
  styleUrls: ['./create-chamado.css'],
})
export class CreateChamado {
  chamado: ChamadoModel = { titulo: '', descricao: '', categoria: '' };
  filteredCategorias: any[] = [];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private service: ChamadosService
  ) {}

  filterCategoria(event: any) {
    const categorias = ['Suporte', 'Financeiro', 'TI', 'RH'];
    this.filteredCategorias = categorias.filter((c) =>
      c.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  salvarChamado() {
    if (!this.chamado.titulo || !this.chamado.descricao || !this.chamado.categoria) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos incompletos',
        detail: 'Preencha todos os campos!',
      });
      return;
    }

    this.service.add(this.chamado);

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Chamado salvo com sucesso!',
    });

    setTimeout(() => {
      this.router.navigate(['/chamados']);
    }, 700);
  }

  cancel() {
    this.router.navigate(['/chamados']);
  }
}
