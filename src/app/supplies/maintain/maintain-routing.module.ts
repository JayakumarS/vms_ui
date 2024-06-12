import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "zones",
    loadChildren: () =>
      import("./zones/zones.module").then((m) => m.ZonesModule),
  },
  {
    path: "identifiers-library",
    loadChildren: () =>
      import("./identifiers-library/identifiers-library.module").then((m) => m.IdentifiersLibraryModule),
  },
  {
    path: 'maintain-counters',
    loadChildren: () =>
      import("./maintain-counters/maintain-counters.module").then((m)=>m.MaintainCountersModule),
      }
      ,
  {
    path: 'departments',
    loadChildren: () =>
    import("./departments/departments.module").then((m)=>m.DepartmentsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainRoutingModule { }
