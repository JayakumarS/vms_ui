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
  },
  {
    path: "item",
    loadChildren: () =>
      import("./item/item.module").then((m) => m.ItemModule),
  },
  {
    path: "systems-and-subsystems",
    loadChildren: () =>
      import("./systems-and-subsystems/systems-and-subsystems.module").then((m) => m.SystemsAndSubsystemsModule),
  },

  {
    path: "vessel-budgets",
    loadChildren: () =>
      import("./vessel-budgets/vessel-budgets.module").then((m) => m.VesselBudgetsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
