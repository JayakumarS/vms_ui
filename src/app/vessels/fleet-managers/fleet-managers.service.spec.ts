import { TestBed } from '@angular/core/testing';

import { FleetManagersService } from './fleet-managers.service';

describe('FleetManagersService', () => {
  let service: FleetManagersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetManagersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
