import { TestBed } from '@angular/core/testing';

import { PrefixesService } from './prefixes.service';

describe('PrefixesService', () => {
  let service: PrefixesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrefixesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
