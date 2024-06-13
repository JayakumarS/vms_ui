import { TestBed } from '@angular/core/testing';

import { VesselsDetailsService } from './vessels-details.service';

describe('VesselsDetailsService', () => {
  let service: VesselsDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VesselsDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
