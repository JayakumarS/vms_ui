import { TestBed } from '@angular/core/testing';

import { UserRightsServiceService } from './user-rights-service.service';

describe('UserRightsServiceService', () => {
  let service: UserRightsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRightsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
