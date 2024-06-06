import { TestBed } from '@angular/core/testing';

import { OfficeEvaluationsService } from './office-evaluations.service';

describe('OfficeEvaluationsService', () => {
  let service: OfficeEvaluationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeEvaluationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
