import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { ChamadoModel } from '../models/chamado.model';

@Injectable({ providedIn: 'root' })
export class ChamadosService {
  private readonly STORAGE_KEY = 'chamados_storage';

  private chamadosSubject = new BehaviorSubject<ChamadoModel[]>([]);
  chamados$ = this.chamadosSubject.asObservable();

  private loaded = false;

  constructor(private http: HttpClient) {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      this.chamadosSubject.next(JSON.parse(saved));
      this.loaded = true;
    }
  }

  private saveToStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.chamadosSubject.value));
  }

  loadMock(): void {
    if (!this.loaded) {
      this.http
        .get<ChamadoModel[]>('assets/mocks/chamados.json')
        .pipe(take(1))
        .subscribe((data) => {
          this.chamadosSubject.next(data);
          this.saveToStorage();
          this.loaded = true;
        });
    }
  }

  list(): Observable<ChamadoModel[]> {
    this.loadMock();
    return this.chamados$;
  }

  add(chamado: ChamadoModel) {
    const atual = this.chamadosSubject.value;

    const novoChamado = {
      ...chamado,
      id: atual.length + 1,
    };

    const atualizado = [...atual, novoChamado];

    this.chamadosSubject.next(atualizado);
    this.saveToStorage();
  }
}
