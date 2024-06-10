import { TestBed } from '@angular/core/testing';

import { DefinePairedRankService } from './define-paired-rank.service';

describe('DefinePairedRankService', () => {
  let service: DefinePairedRankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefinePairedRankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
