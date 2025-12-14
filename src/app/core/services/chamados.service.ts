import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, take, of } from 'rxjs';
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

  add(chamado: Omit<ChamadoModel, 'id'>): Observable<ChamadoModel> {
    const atual = this.chamadosSubject.value;
    const maxId = atual.length ? Math.max(...atual.map((c) => c.id ?? 0)) : 0;

    const novo: ChamadoModel = {
      ...chamado,
      id: maxId + 1,
      createdAt: new Date().toISOString(),
    };
    const atualizado = [novo, ...atual];
    this.chamadosSubject.next(atualizado);
    this.saveToStorage();
    return of(novo);
  }

  update(chamado: ChamadoModel) {
    const atual = this.chamadosSubject.value.map((c) => (c.id === chamado.id ? chamado : c));
    this.chamadosSubject.next(atual);
    this.saveToStorage();
  }

  remove(id: number) {
    const atual = this.chamadosSubject.value;
    const atualizado = atual.filter((c) => c.id !== id);
    this.chamadosSubject.next(atualizado);
    this.saveToStorage();
  }

  getById(id: number): ChamadoModel | undefined {
    return this.chamadosSubject.value.find((c) => c.id === id);
  }
}
