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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliesRoutingModule { }
