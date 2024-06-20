import { TestBed } from '@angular/core/testing';

import { CrewVesselAssignmentService } from './crew-vessel-assignment.service';

describe('CrewVesselAssignmentService', () => {
  let service: CrewVesselAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrewVesselAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
