import { TestBed } from '@angular/core/testing';

import { PersonalContractsService } from './personal-contracts.service';

describe('PersonalContractsService', () => {
  let service: PersonalContractsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalContractsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
