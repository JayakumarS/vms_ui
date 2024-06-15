import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [


  {
    path: "airlines",
    loadChildren: () =>
      import("./airlines/airlines.module").then((m) => m.airlines),
  },
  {

    path: "cities-airports",
    loadChildren: () =>
      import("./cities-airports/cities-airports.module").then((m) => m.CitiesAirportsModule),
  },
  {
    path: "company-employees",
    loadChildren: () =>
      import("./company-employees/company-employees.module").then((m) => m.CompanyEmployeesModule),
  },
  {
    path: "link-ticket-types-ledger-cards",
    loadChildren: () =>
      import("./link-ticket-types-ledger-cards/link-ticket-types-ledger-cards.module").then((m) => m.LinkTicketTypesLedgerCardsModule),
  },
  {
    path: "ticket-types",
    loadChildren: () =>
      import("./ticket-types/ticket-types.module").then((m) => m.TicketTypesModule),
  },
  {
    path: "travel-agencies",
    loadChildren: () =>
      import("./travel-agencies/travel-agencies.module").then((m) => m.TravelAgenciesModule),
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrewTicketingRoutingModule { }
