import { TestBed } from '@angular/core/testing';

import { PersonMaintenanceService } from './person-maintenance.service';

describe('PersonMaintenanceService', () => {
  let service: PersonMaintenanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonMaintenanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
