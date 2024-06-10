import { TestBed } from '@angular/core/testing';

import { VesselPortArrivalService } from './vessel-port-arrival.service';

describe('VesselPortArrivalService', () => {
  let service: VesselPortArrivalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VesselPortArrivalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
