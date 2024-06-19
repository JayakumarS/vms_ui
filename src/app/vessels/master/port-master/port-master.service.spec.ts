import { TestBed } from '@angular/core/testing';

import { PortMasterService } from './port-master.service';

describe('PortMasterService', () => {
  let service: PortMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
