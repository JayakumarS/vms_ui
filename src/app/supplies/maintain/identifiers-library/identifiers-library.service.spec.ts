import { TestBed } from '@angular/core/testing';

import { IdentifiersLibraryService } from './identifiers-library.service';

describe('IdentifiersLibraryService', () => {
  let service: IdentifiersLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentifiersLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
