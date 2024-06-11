import { TestBed } from '@angular/core/testing';

import { AccountantsService } from './accountants.service';

describe('AccountantsService', () => {
  let service: AccountantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
