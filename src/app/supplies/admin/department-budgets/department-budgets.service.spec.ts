import { TestBed } from '@angular/core/testing';

import { DepartmentBudgetsService } from './department-budgets.service';

describe('DepartmentBudgetsService', () => {
  let service: DepartmentBudgetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentBudgetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
