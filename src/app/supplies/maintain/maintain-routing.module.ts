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
  },
  {
    path: 'units-packings',
    loadChildren: () =>
    import("./units-packings/units-packings.module").then((m)=>m.UnitsPackingsModule),
  },
  {
    path: 'ship-managers',
    loadChildren: () =>
    import("./ship-managers/ship-managers.module").then((m)=>m.ShipManagersModule),
  },
  {
    path: 'despatch-reasons',
    loadChildren: () =>
    import("./despatch-reasons/despatch-reasons.module").then((m)=>m.DespatchReasonsModule),
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainRoutingModule { }
