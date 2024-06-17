import { TestBed } from '@angular/core/testing';

import { VesselsHistoryService } from './vessels-history.service';

describe('VesselsHistoryService', () => {
  let service: VesselsHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VesselsHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
