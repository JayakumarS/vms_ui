import { TestBed } from '@angular/core/testing';

import { DefineEvaluationLegendsService } from './define-evaluation-legends.service';

describe('DefineEvaluationLegendsService', () => {
  let service: DefineEvaluationLegendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefineEvaluationLegendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
