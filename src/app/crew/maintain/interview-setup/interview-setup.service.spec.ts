import { TestBed } from '@angular/core/testing';

import { InterviewSetupService } from './interview-setup.service';

describe('InterviewSetupService', () => {
  let service: InterviewSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
