import { TestBed } from '@angular/core/testing';

import { VesselGroupService } from './vessel-group.service';

describe('VesselGroupService', () => {
  let service: VesselGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VesselGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
