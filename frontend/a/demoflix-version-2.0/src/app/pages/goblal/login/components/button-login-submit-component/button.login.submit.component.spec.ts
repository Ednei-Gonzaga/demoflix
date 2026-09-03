import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLoginSubmitComponent } from './button.login.submit.component';

describe('ButtonLoginSubmitComponent', () => {
  let component: ButtonLoginSubmitComponent;
  let fixture: ComponentFixture<ButtonLoginSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonLoginSubmitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonLoginSubmitComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
