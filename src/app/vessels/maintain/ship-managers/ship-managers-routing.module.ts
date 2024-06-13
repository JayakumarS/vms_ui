import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddShipManagersComponent } from './add-ship-managers/add-ship-managers.component';
import { ListShipManagersComponent } from './list-ship-managers/list-ship-managers.component';

const routes: Routes = [
  {
    path:'add-ship-managers/:0',
    component:AddShipManagersComponent
  },
  {
    path: 'list-ship-managers',
    component:ListShipManagersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipManagersRoutingModule { }
