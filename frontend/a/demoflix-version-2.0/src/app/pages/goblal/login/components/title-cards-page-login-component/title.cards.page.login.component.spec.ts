import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleCardsPageLoginComponent } from './title.cards.page.login.component';

describe('TitleCardsPageLoginComponent', () => {
  let component: TitleCardsPageLoginComponent;
  let fixture: ComponentFixture<TitleCardsPageLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleCardsPageLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleCardsPageLoginComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
