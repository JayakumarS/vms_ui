import { TestBed } from '@angular/core/testing';

import { LandedgoodsControlpanelService } from './landedgoods-controlpanel.service';

describe('LandedgoodsControlpanelService', () => {
  let service: LandedgoodsControlpanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandedgoodsControlpanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
