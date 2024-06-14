import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "maintain",
    loadChildren: () =>
      import("./maintain/maintain.module").then((m) => m.MaintainModule),
  },
  {
    path: "utilities",
    loadChildren: () =>
      import("./utilities/utilities.module").then((m) => m.UtilitiesModule),
  },
  {
    path: "supplycycle",
     loadChildren: () =>
       import("./supplycycle-controlpanel/supplycycle-controlpanel.module").then((m) => m.SupplycycleControlpanelModule),
   },
   {
    path: "new",
    loadChildren: () =>
      import("./new/new.module").then((m) => m.NewModule)
   },
   {
    path: "supply-dashboard",
    loadChildren: () =>
      import("./supply-dashboard/supply-dashboard.module").then((m) => m.SupplyDashboardModule),
  },

  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: "map",
    loadChildren: () =>
      import("./map/map.module").then((m) => m.MapModule),
  },
  {
    path: "landedgoods",
     loadChildren: () =>
       import("./landedgoods-controlpanel/landedgoods-controlpanel.module").then((m) => m.LandedgoodsControlpanelModule),
   },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliesRoutingModule { }
