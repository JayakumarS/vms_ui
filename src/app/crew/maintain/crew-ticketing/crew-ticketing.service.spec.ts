import { TestBed } from '@angular/core/testing';

import { CrewTicketingService } from './crew-ticketing.service';

describe('CrewTicketingService', () => {
  let service: CrewTicketingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrewTicketingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
