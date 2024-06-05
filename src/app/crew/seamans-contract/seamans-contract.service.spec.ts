import { TestBed } from '@angular/core/testing';

import { SeamansContractService } from './seamans-contract.service';

describe('SeamansContractService', () => {
  let service: SeamansContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeamansContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
