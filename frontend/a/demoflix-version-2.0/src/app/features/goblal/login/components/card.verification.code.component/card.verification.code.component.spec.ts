import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVerificationCodeComponent } from './card.verification.code.component';

describe('CardVerificationCodeComponent', () => {
  let component: CardVerificationCodeComponent;
  let fixture: ComponentFixture<CardVerificationCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardVerificationCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardVerificationCodeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
