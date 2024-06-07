import { TestBed } from '@angular/core/testing';

import { WageScalesService } from './wage-scales.service';

describe('WageScalesService', () => {
  let service: WageScalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WageScalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
