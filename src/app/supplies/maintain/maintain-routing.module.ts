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
    path: 'freight-type',
    loadChildren: () =>
    import("./freight-type/freight-type.module").then((m)=>m.FreightTypeModule),
  },
  {
    path: 'storage-location',
    loadChildren: () =>
    import("./storage-location/storage-location.module").then((m)=>m.StorageLocationModule),
  },
  {
    path: 'despatch-reasons',
    loadChildren: () =>
    import("./despatch-reasons/despatch-reasons.module").then((m)=>m.DespatchReasonsModule),
  },
  {
    path: 'e-commerce-suppliers-reference',
    loadChildren: () =>
    import("./e-commerce-suppliers-reference/e-commerce-suppliers-reference.module").then((m)=>m.ECommerceSuppliersReferenceModule),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainRoutingModule { }
