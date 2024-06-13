import { TestBed } from '@angular/core/testing';

import { SystemAndSubsystemService } from './system-and-subsystem.service';

describe('SystemAndSubsystemService', () => {
  let service: SystemAndSubsystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemAndSubsystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
