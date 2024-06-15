import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLinkTicketTypesLedgerCardsComponent } from './list-link-ticket-types-ledger-cards/list-link-ticket-types-ledger-cards.component';
import { AddLinkTicketTypesLedgerCardsComponent } from './add-link-ticket-types-ledger-cards/add-link-ticket-types-ledger-cards.component';

const routes: Routes = [

  {
    path: "list-link-ticket-types-ledger-cards",
    component: ListLinkTicketTypesLedgerCardsComponent,
  },
  {
    path: "add-link-ticket-types-ledger-cards/:id",
    component: AddLinkTicketTypesLedgerCardsComponent,
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinkTicketTypesLedgerCardsRoutingModule { }
