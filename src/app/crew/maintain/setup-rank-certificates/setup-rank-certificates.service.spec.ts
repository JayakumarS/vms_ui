import { TestBed } from '@angular/core/testing';

import { SetupRankCertificatesService } from './setup-rank-certificates.service';

describe('SetupRankCertificatesService', () => {
  let service: SetupRankCertificatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupRankCertificatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
