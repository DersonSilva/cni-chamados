import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ChamadosService } from './chamados';

describe('ChamadosService', () => {
  let service: ChamadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChamadosService, provideHttpClientTesting()],
    });

    service = TestBed.inject(ChamadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
