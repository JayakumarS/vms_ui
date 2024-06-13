import { TestBed } from '@angular/core/testing';

import { VesselBudgetsPeriodService } from './vessel-budgets-period.service';

describe('VesselBudgetsPeriodService', () => {
  let service: VesselBudgetsPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VesselBudgetsPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
