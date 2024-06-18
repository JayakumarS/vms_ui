import { TestBed } from '@angular/core/testing';

import { VesselOwnerService } from './vessel-owner.service';

describe('VesselOwnerService', () => {
  let service: VesselOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VesselOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
