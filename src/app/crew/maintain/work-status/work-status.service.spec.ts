import { TestBed } from '@angular/core/testing';

import { WorkStatusService } from './work-status.service';

describe('WorkStatusService', () => {
  let service: WorkStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
