import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLoginComponents } from './page.login.components';

describe('PageLoginComponents', () => {
  let component: PageLoginComponents;
  let fixture: ComponentFixture<PageLoginComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLoginComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageLoginComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
