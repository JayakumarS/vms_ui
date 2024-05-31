import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  
  {
    path: "user-rights",
    loadChildren: () =>
      import("./user-rights/user-rights.module").then((m) => m.UserRightsModule),
  },
  {
    path: "userrightsnew",
    loadChildren: () =>
      import("./userrightsnew/userrightsnew.module").then((m) => m.UserrightsnewModule),
  },
  
  {
    path: "userLog",
    loadChildren: () =>
      import("./user-log/user-log.module").then((m) => m.UserLogModule),
  },
  {
    path: "auditLog",
    loadChildren: () =>
      import("./audit-log/audit-log.module").then((m) => m.AuditLogModule),
  },
  {
    path: "userMaster",
    loadChildren: () =>
      import("./user-master/user-master.module").then((m) => m.UserMasterModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
