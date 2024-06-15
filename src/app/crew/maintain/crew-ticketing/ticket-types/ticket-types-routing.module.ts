import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTicketTypesComponent } from './add-ticket-types/add-ticket-types.component';
import { ListTicketTypesComponent } from './list-ticket-types/list-ticket-types.component';

const routes: Routes = [ 

  {
    path: "list-ticket-types",
    component: ListTicketTypesComponent,
  },
  {
    path: "add-ticket-types/:id",
    component: AddTicketTypesComponent,
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketTypesRoutingModule { }
