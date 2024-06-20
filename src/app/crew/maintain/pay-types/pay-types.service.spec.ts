import { TestBed } from '@angular/core/testing';

import { PayTypesService } from './pay-types.service';

describe('PayTypesService', () => {
  let service: PayTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
