import { TestBed } from '@angular/core/testing';

import { MaintainCountersService } from './maintain-counters.service';

describe('MaintainCountersService', () => {
  let service: MaintainCountersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintainCountersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
