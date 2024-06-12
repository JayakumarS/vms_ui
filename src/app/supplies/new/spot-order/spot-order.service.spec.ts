import { TestBed } from '@angular/core/testing';

import { SpotOrderService } from './spot-order.service';

describe('SpotOrderService', () => {
  let service: SpotOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
