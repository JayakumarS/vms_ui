import { TestBed } from '@angular/core/testing';

import { ContractsKNEService } from './contracts-kne.service';

describe('ContractsKNEService', () => {
  let service: ContractsKNEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractsKNEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
