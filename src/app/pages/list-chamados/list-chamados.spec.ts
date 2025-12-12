import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChamados } from './list-chamados';

describe('ListChamados', () => {
  let component: ListChamados;
  let fixture: ComponentFixture<ListChamados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListChamados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListChamados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
