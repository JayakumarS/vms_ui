import { TestBed } from '@angular/core/testing';

import { SupplycycleControlpanelService } from './supplycycle-controlpanel.service';

describe('SupplycycleControlpanelService', () => {
  let service: SupplycycleControlpanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplycycleControlpanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
