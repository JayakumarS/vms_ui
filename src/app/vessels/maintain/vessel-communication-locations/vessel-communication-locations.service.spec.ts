import { TestBed } from '@angular/core/testing';

import { VesselCommunicationLocationsService } from './vessel-communication-locations.service';

describe('VesselCommunicationLocationsService', () => {
  let service: VesselCommunicationLocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VesselCommunicationLocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
