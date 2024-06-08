import { TestBed } from '@angular/core/testing';

import { FdAndDService } from './fd-and-d.service';

describe('FdAndDService', () => {
  let service: FdAndDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdAndDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
