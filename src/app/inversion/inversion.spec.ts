import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inversion } from './inversion';

describe('Inversion', () => {
  let component: Inversion;
  let fixture: ComponentFixture<Inversion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inversion],
    }).compileComponents();

    fixture = TestBed.createComponent(Inversion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
