import { TestBed } from '@angular/core/testing';

import { VesselBudgetsService } from './vessel-budgets.service';

describe('VesselBudgetsService', () => {
  let service: VesselBudgetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VesselBudgetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
