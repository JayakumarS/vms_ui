import { TestBed } from '@angular/core/testing';

import { UnitsPackingsService } from './units-packings.service';

describe('UnitsPackingsService', () => {
  let service: UnitsPackingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitsPackingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
