import { TestBed } from '@angular/core/testing';

import { CitiesAirportsService } from './cities-airports.service';

describe('CitiesAirportsService', () => {
  let service: CitiesAirportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitiesAirportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
