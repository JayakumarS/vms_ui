import { TestBed } from '@angular/core/testing';

import { TravelAgenciesService } from './travel-agencies.service';

describe('TravelAgenciesService', () => {
  let service: TravelAgenciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelAgenciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
