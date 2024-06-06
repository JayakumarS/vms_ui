import { TestBed } from '@angular/core/testing';

import { DefinePreferencesForWorkingHoursService } from './define-preferences-for-working-hours.service';

describe('DefinePreferencesForWorkingHoursService', () => {
  let service: DefinePreferencesForWorkingHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefinePreferencesForWorkingHoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
