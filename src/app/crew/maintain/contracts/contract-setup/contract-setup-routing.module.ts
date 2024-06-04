import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: "pay-types",
    loadChildren: () =>
      import("./pay-types/pay-types.module").then((m) => m.PayTypesModule),
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractSetupRoutingModule { }
