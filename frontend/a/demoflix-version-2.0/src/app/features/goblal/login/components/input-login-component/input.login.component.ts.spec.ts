import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLoginComponentTs } from './input.login.component.ts.js';

describe('InputLoginComponentTs', () => {
  let component: InputLoginComponentTs;
  let fixture: ComponentFixture<InputLoginComponentTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputLoginComponentTs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputLoginComponentTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
