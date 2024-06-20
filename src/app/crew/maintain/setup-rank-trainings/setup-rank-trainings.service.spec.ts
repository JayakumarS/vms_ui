import { TestBed } from '@angular/core/testing';

import { SetupRankTrainingsService } from './setup-rank-trainings.service';

describe('SetupRankTrainingsService', () => {
  let service: SetupRankTrainingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupRankTrainingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
