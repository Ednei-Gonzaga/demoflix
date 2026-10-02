import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAuthLinkComponent } from './login.auth.link.component';

describe('LoginAuthLinkComponent', () => {
  let component: LoginAuthLinkComponent;
  let fixture: ComponentFixture<LoginAuthLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAuthLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAuthLinkComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
