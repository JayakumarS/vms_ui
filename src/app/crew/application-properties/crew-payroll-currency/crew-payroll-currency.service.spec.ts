import { TestBed } from '@angular/core/testing';

import { CrewPayrollCurrencyService } from './crew-payroll-currency.service';

describe('CrewPayrollCurrencyService', () => {
  let service: CrewPayrollCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrewPayrollCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
