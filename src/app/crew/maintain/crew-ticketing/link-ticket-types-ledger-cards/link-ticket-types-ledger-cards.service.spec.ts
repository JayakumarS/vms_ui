import { TestBed } from '@angular/core/testing';

import { LinkTicketTypesLedgerCardsService } from './link-ticket-types-ledger-cards.service';

describe('LinkTicketTypesLedgerCardsService', () => {
  let service: LinkTicketTypesLedgerCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkTicketTypesLedgerCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
