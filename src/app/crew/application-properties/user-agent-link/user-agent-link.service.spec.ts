import { TestBed } from '@angular/core/testing';

import { UserAgentLinkService } from './user-agent-link.service';

describe('UserAgentLinkService', () => {
  let service: UserAgentLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAgentLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
