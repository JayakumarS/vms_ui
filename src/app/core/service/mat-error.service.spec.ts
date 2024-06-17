import { TestBed } from '@angular/core/testing';

import { MatErrorService } from './mat-error.service';

describe('MatErrorService', () => {
  let service: MatErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
