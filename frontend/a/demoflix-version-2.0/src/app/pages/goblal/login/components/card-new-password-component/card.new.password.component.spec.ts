import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNewPasswordComponent } from './card.new.password.component';

describe('CardNewPasswordComponent', () => {
  let component: CardNewPasswordComponent;
  let fixture: ComponentFixture<CardNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNewPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNewPasswordComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
