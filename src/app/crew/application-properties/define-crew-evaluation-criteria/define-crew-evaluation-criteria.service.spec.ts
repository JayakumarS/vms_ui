import { TestBed } from '@angular/core/testing';

import { DefineCrewEvaluationCriteriaService } from './define-crew-evaluation-criteria.service';

describe('DefineCrewEvaluationCriteriaService', () => {
  let service: DefineCrewEvaluationCriteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefineCrewEvaluationCriteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
