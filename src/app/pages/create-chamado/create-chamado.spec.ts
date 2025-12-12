import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChamado } from './create-chamado';

describe('CreateChamado', () => {
  let component: CreateChamado;
  let fixture: ComponentFixture<CreateChamado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateChamado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateChamado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
