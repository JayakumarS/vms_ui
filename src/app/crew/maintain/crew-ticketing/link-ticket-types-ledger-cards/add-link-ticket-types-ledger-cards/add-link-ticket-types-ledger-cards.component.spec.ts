import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLinkTicketTypesLedgerCardsComponent } from './add-link-ticket-types-ledger-cards.component';

describe('AddLinkTicketTypesLedgerCardsComponent', () => {
  let component: AddLinkTicketTypesLedgerCardsComponent;
  let fixture: ComponentFixture<AddLinkTicketTypesLedgerCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLinkTicketTypesLedgerCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLinkTicketTypesLedgerCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
