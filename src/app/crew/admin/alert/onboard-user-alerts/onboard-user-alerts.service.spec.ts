import { TestBed } from '@angular/core/testing';

import { OnboardUserAlertsService } from './onboard-user-alerts.service';

describe('OnboardUserAlertsService', () => {
  let service: OnboardUserAlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnboardUserAlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
