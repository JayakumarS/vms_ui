import { TestBed } from '@angular/core/testing';

import { FamiliarizationTypesService } from './familiarization-types.service';

describe('FamiliarizationTypesService', () => {
  let service: FamiliarizationTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamiliarizationTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
