import { TestBed } from '@angular/core/testing';

import { CompanyEmployeesService } from './company-employees.service';

describe('CompanyEmployeesService', () => {
  let service: CompanyEmployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyEmployeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
