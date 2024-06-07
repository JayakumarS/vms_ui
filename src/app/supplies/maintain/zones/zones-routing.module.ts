import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddZonesComponent } from './add-zones/add-zones.component';
import { ListZonesComponent } from './list-zones/list-zones.component';

const routes: Routes = [

   {
    path:"list-zones",
    component:ListZonesComponent
  },
  {
    path:"add-zones/:id",
    component:AddZonesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZonesRoutingModule { }
