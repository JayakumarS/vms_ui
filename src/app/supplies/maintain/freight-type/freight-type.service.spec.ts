import { TestBed } from '@angular/core/testing';

import { FreightTypeService } from './freight-type.service';

describe('FreightTypeService', () => {
  let service: FreightTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreightTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
