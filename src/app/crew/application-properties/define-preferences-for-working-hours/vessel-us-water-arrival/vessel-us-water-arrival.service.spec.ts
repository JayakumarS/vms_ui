import { TestBed } from '@angular/core/testing';

import { VesselUsWaterArrivalService } from './vessel-us-water-arrival.service';

describe('VesselUsWaterArrivalService', () => {
  let service: VesselUsWaterArrivalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VesselUsWaterArrivalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
