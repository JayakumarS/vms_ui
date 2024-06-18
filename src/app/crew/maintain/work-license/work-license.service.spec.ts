import { TestBed } from '@angular/core/testing';

import { WorkLicenseService } from './work-license.service';

describe('WorkLicenseService', () => {
  let service: WorkLicenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkLicenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
