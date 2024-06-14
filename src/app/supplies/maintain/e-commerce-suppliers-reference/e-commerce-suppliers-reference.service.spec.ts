import { TestBed } from '@angular/core/testing';

import { ECommerceSuppliersReferenceService } from './e-commerce-suppliers-reference.service';

describe('ECommerceSuppliersReferenceService', () => {
  let service: ECommerceSuppliersReferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ECommerceSuppliersReferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
