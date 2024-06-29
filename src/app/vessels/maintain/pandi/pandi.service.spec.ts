import { TestBed } from '@angular/core/testing';

import { PandiService } from './pandi.service';

describe('PandiService', () => {
  let service: PandiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PandiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
