import { TestBed } from '@angular/core/testing';

import { DefineQualificationService } from './define-qualification.service';

describe('DefineQualificationService', () => {
  let service: DefineQualificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefineQualificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
