import { TestBed } from '@angular/core/testing';

import { OfficialManagersService } from './official-managers.service';

describe('OfficialManagersService', () => {
  let service: OfficialManagersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficialManagersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
