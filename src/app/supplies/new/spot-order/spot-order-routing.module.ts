import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSpotOrderComponent } from './list-spot-order/list-spot-order.component';
import { AddSpotOrderComponent } from './add-spot-order/add-spot-order.component';

const routes: Routes = [
  {
    path:'list-spot-order',
    component: ListSpotOrderComponent
  },
  {
    path:'add-spot-order/:id',
    component: AddSpotOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpotOrderRoutingModule { }
