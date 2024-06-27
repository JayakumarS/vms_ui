import { TestBed } from '@angular/core/testing';

import { SetupRankMedicalsService } from './setup-rank-medicals.service';

describe('SetupRankMedicalsService', () => {
  let service: SetupRankMedicalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupRankMedicalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
