import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCreatedAccountComponent } from './card.created.account.component';

describe('CardCreatedAccountComponent', () => {
  let component: CardCreatedAccountComponent;
  let fixture: ComponentFixture<CardCreatedAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCreatedAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCreatedAccountComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
