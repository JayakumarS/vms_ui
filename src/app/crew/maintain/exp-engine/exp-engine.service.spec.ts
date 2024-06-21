import { TestBed } from '@angular/core/testing';

import { ExpEngineService } from './exp-engine.service';

describe('ExpEngineService', () => {
  let service: ExpEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
