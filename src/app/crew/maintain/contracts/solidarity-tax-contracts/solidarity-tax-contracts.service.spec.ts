import { TestBed } from '@angular/core/testing';

import { SolidarityTaxContractsService } from './solidarity-tax-contracts.service';

describe('SolidarityTaxContractsService', () => {
  let service: SolidarityTaxContractsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolidarityTaxContractsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
