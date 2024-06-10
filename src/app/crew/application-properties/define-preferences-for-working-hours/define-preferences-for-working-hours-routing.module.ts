import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "define-shift-scenario",
    loadChildren: () =>
      import("./define-shift-scenario/define-shift-scenario.module").then((m) => m.DefineShiftScenarioModule),
  },
  {
    path: "define-rank-shift",
    loadChildren: () =>
      import("./rank-shift/rank-shift.module").then((m) => m.RankShiftModule),
  },
  {
    path: "define-vessel-port-arrival",
    loadChildren: () =>
      import("./vessel-port-arrival/vessel-port-arrival.module").then((m) => m.VesselPortArrivalModule),
  },
  {
    path: "define-vessel-us-water-arrival",
    loadChildren: () =>
      import("./vessel-us-water-arrival/vessel-us-water-arrival.module").then((m) => m.VesselUsWaterArrivalModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefinePreferencesForWorkingHoursRoutingModule { }
