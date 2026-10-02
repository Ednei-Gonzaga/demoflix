import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRecoverEmailPasswordComponent } from './card.recover.email.password.component';

describe('CardRecoverEmailPasswordComponent', () => {
  let component: CardRecoverEmailPasswordComponent;
  let fixture: ComponentFixture<CardRecoverEmailPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRecoverEmailPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRecoverEmailPasswordComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
