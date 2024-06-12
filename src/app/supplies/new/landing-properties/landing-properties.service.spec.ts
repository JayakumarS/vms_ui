import { TestBed } from '@angular/core/testing';

import { LandingPropertiesService } from './landing-properties.service';

describe('LandingPropertiesService', () => {
  let service: LandingPropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandingPropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
