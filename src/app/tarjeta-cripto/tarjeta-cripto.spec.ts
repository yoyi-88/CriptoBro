import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaCripto } from './tarjeta-cripto';

describe('TarjetaCripto', () => {
  let component: TarjetaCripto;
  let fixture: ComponentFixture<TarjetaCripto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaCripto],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaCripto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
