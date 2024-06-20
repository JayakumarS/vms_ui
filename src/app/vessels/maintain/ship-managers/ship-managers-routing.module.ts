import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddShipManagersComponent } from './add-ship-managers/add-ship-managers.component';
import { ListShipManagersComponent } from './list-ship-managers/list-ship-managers.component';
import { ViewShipManagersComponent } from './view-ship-managers/view-ship-managers.component';

const routes: Routes = [
  {
    path:'add-ship-managers/:id',
    component:AddShipManagersComponent
  },
  {
    path: 'list-ship-managers',
    component:ListShipManagersComponent
  },
  {
    path:"view-ship-managers/:id",
    component:ViewShipManagersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipManagersRoutingModule { }
