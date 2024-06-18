import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "fleets",
    loadChildren: () =>
      import("./fleets/fleets.module").then((m) => m.FleetsModule),
  },
  {
    path: "vessel-types",
    loadChildren: () =>
      import("./vessel-types/vessel-types.module").then((m) => m.VesselTypesModule),
  },
  {
    path: "class",
    loadChildren: () =>
      import("./class/class.module").then((m) => m.ClassModule),
  },
  {
    path: "classification",
    loadChildren: () =>
      import("./classification/classification.module").then((m) => m.ClassificationModule),
  },
  {
    path: "wage-scale",
    loadChildren: () =>
      import("./wage-scales/wage-scales.module").then((m) => m.WageScalesModule),
  },
  {
    path: "vessel-insurance",
    loadChildren: () =>
      import("./vessel-insurance/vessel-insurance.module").then((m) => m.VesselInsuranceModule),
  },
  {
    path: "fd-and-d",
    loadChildren: () =>
      import("./fd-and-d/fd-and-d.module").then((m) => m.FdAndDModule),
  },
  {
    path: "vessel-group",
    loadChildren: () =>
      import("./vessel-group/vessel-group.module").then((m) => m.VesselGroupModule),
  },
  {
    path: "prefixes",
    loadChildren: () =>
      import("./prefixes/prefixes.module").then((m) => m.PrefixesModule),
  },
  {
    path: "communication-types",
    loadChildren: () =>
      import("./communication-types/communication-types.module").then((m) => m.CommunicationTypesModule),
  },
  {
    path: "engine-types",
    loadChildren: () =>
      import("./engine-types/engine-types.module").then((m) => m.EngineTypesModule),
  },
  {
    path: "fleet-managers",
    loadChildren: () =>
      import("./fleet-managers/fleet-managers.module").then((m) => m.FleetManagersModule),
  },
  {
    path: "accountants",
    loadChildren: () =>
      import("./accountants/accountants.module").then((m) => m.AccountantsModule),
  },
  {
    path: "areas",
    loadChildren: () =>
      import("./areas/areas.module").then((m) => m.AreasModule),
  },
  {
    path: "bunker-tanks",
    loadChildren: () =>
      import("./bunker-tanks/bunker-tanks.module").then((m) => m.BunkerTanksModule),
  },
  {
    path: "vessel-communication-locations",
    loadChildren: () =>
      import("./vessel-communication-locations/vessel-communication-locations.module").then((m) => m.VesselCommunicationLocationsModule),
  },
  {
    path: "official-managers",
    loadChildren: () =>
      import("./official-managers/official-managers.module").then((m) => m.OfficialManagersModule),
  },
  {
    path: "ship-managers",
    loadChildren: () =>
      import("./ship-managers/ship-managers.module").then((m) => m.ShipManagersModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainRoutingModule { }
