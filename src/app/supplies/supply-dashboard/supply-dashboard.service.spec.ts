import { TestBed } from '@angular/core/testing';

import { SupplyDashboardService } from './supply-dashboard.service';

describe('SupplyDashboardService', () => {
  let service: SupplyDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplyDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
