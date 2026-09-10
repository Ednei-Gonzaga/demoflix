import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingInformationMessageComponent } from './floating.information.message.component';

describe('FloatingInformationMessageComponent', () => {
  let component: FloatingInformationMessageComponent;
  let fixture: ComponentFixture<FloatingInformationMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingInformationMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingInformationMessageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
