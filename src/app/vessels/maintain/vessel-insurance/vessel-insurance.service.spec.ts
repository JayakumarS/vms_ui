import { TestBed } from '@angular/core/testing';

import { VesselInsuranceService } from './vessel-insurance.service';

describe('VesselInsuranceService', () => {
  let service: VesselInsuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VesselInsuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
