import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: "supplier-groups",
    loadChildren: () =>
      import("./supplier-groups/supplier-groups.module").then((m) => m.SupplierGroupsModule),
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
