import { TestBed } from '@angular/core/testing';

import { MaintainRankService } from './maintain-rank.service';

describe('MaintainRankService', () => {
  let service: MaintainRankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintainRankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
