import { Routes } from '@angular/router';

import { ListChamados } from './pages/list-chamados/list-chamados';
import { CreateChamado } from './pages/create-chamado/create-chamado';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'chamados',
    pathMatch: 'full',
  },

  {
    path: 'chamados',
    component: ListChamados,
  },

  {
    path: 'chamados/novo',
    component: CreateChamado,
  },

  {
    path: '**',
    redirectTo: 'chamados',
  },
];
