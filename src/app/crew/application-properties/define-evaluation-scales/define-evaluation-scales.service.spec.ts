import { TestBed } from '@angular/core/testing';

import { DefineEvaluationScalesService } from './define-evaluation-scales.service';

describe('DefineEvaluationScalesService', () => {
  let service: DefineEvaluationScalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefineEvaluationScalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
