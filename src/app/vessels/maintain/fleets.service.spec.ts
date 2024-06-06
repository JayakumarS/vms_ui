import { TestBed } from '@angular/core/testing';

import { FleetsService } from './fleets.service';

describe('FleetsService', () => {
  let service: FleetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
