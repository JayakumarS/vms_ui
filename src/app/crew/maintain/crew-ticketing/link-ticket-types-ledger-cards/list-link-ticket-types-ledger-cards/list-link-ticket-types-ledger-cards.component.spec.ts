import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLinkTicketTypesLedgerCardsComponent } from './list-link-ticket-types-ledger-cards.component';

describe('ListLinkTicketTypesLedgerCardsComponent', () => {
  let component: ListLinkTicketTypesLedgerCardsComponent;
  let fixture: ComponentFixture<ListLinkTicketTypesLedgerCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLinkTicketTypesLedgerCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLinkTicketTypesLedgerCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
