import { TestBed } from '@angular/core/testing';

import { DefineRanksService } from './define-ranks.service';

describe('DefineRanksService', () => {
  let service: DefineRanksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefineRanksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
