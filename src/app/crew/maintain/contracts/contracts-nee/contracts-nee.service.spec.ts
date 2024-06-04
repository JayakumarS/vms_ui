import { TestBed } from '@angular/core/testing';

import { ContractsNEEService } from './contracts-nee.service';

describe('ContractsNEEService', () => {
  let service: ContractsNEEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractsNEEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
