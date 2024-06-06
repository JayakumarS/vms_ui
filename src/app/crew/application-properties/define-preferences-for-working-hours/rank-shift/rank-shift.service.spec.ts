import { TestBed } from '@angular/core/testing';

import { RankShiftService } from './rank-shift.service';

describe('RankShiftService', () => {
  let service: RankShiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankShiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
