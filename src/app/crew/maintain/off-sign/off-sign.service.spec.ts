import { TestBed } from '@angular/core/testing';

import { OffSignService } from './off-sign.service';

describe('OffSignService', () => {
  let service: OffSignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffSignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
