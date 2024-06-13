import { TestBed } from '@angular/core/testing';

import { ShipManagersService } from './ship-managers.service';

describe('ShipManagersService', () => {
  let service: ShipManagersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipManagersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
