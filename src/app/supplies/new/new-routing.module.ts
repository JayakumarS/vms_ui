import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "requisition",
    loadChildren: () =>
      import("./requisition/requisition.module").then((m) => m.RequisitionModule),
  },
  {
    path: "spot-order",
    loadChildren: () =>
      import("./spot-order/spot-order.module").then((m) => m.SpotOrderModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRoutingModule { }
