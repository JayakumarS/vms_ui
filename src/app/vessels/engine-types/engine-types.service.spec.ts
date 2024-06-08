import { TestBed } from '@angular/core/testing';

import { EngineTypesService } from './engine-types.service';

describe('EngineTypesService', () => {
  let service: EngineTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngineTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
