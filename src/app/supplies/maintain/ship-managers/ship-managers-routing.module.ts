import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListShipManagersComponent } from './list-ship-managers/list-ship-managers.component';
import { AddShipManagersComponent } from './add-ship-managers/add-ship-managers.component';

const routes: Routes = [
  {
    path: "list-ship-managers",
    component: ListShipManagersComponent,
  },
  {
    path: "add-ship-managers/:id",
    component: AddShipManagersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipManagersRoutingModule { }
