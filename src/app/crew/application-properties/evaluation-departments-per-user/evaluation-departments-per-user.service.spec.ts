import { TestBed } from '@angular/core/testing';

import { EvaluationDepartmentsPerUserService } from './evaluation-departments-per-user.service';

describe('EvaluationDepartmentsPerUserService', () => {
  let service: EvaluationDepartmentsPerUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationDepartmentsPerUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
