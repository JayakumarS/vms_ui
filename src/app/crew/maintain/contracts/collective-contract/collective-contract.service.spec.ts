import { TestBed } from '@angular/core/testing';

import { CollectiveContractService } from './collective-contract.service';

describe('CollectiveContractService', () => {
  let service: CollectiveContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectiveContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
