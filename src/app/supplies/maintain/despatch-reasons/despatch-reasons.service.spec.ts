import { TestBed } from '@angular/core/testing';

import { DespatchReasonsService } from './despatch-reasons.service';

describe('DespatchReasonsService', () => {
  let service: DespatchReasonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DespatchReasonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
