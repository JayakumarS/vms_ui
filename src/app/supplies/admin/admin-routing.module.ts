import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: "supplier-groups",
    loadChildren: () =>
      import("./supplier-groups/supplier-groups.module").then((m) => m.SupplierGroupsModule),
  },
  {
    path: "vessel-budgets-period",
    loadChildren: () =>
      import("./vessel-budgets-period/vessel-budgets-period.module").then((m) => m.VesselBudgetsPeriodModule),
  },
  {
    path: "department-budgets",
    loadChildren: () =>
      import("./department-budgets/department-budgets.module").then((m) => m.DepartmentBudgetsModule),
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
