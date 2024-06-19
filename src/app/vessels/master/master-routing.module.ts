import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: "country-Master",
    loadChildren: () =>
      import("./country-master/country-master.module").then((m) => m.CountryMasterModule),
  },
  {
    path: "port-Master",
    loadChildren: () =>
      import("./port-master/port-master.module").then((m) => m.PortMasterModule),
  },
  {
    path: "uom-Master",
    loadChildren: () =>
      import("./uom-master/uom-master.module").then((m) => m.UomMasterModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
