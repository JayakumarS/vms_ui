import { TestBed } from '@angular/core/testing';

import { RankGroupService } from './rank-group.service';

describe('RankGroupService', () => {
  let service: RankGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
