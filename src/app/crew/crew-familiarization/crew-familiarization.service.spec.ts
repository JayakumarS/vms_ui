import { TestBed } from '@angular/core/testing';

import { CrewFamiliarizationService } from './crew-familiarization.service';

describe('CrewFamiliarizationService', () => {
  let service: CrewFamiliarizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrewFamiliarizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
