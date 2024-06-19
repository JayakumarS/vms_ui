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
    path: "department-Master",
    loadChildren: () =>
      import("./department-master/department-master.module").then((m) => m.DepartmentMasterModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
