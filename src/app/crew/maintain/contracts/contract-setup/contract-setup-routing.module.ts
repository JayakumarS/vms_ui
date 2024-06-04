import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: "pay-types",
    loadChildren: () =>
      import("./pay-types/pay-types.module").then((m) => m.PayTypesModule),
  },

  {
    path: "pay-items",
    loadChildren: () =>
      import("./pay-items/pay-items.module").then((m) => m.PayItemsModule),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractSetupRoutingModule { }
