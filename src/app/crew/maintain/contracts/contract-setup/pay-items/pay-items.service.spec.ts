import { TestBed } from '@angular/core/testing';

import { PayItemsService } from './pay-items.service';

describe('PayItemsService', () => {
  let service: PayItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
