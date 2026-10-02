import { TestBed } from '@angular/core/testing';

import { FloatingInformationService } from './floating.information.service';

describe('FloatingInformationService', () => {
  let service: FloatingInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloatingInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
