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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefinePreferencesForWorkingHoursRoutingModule { }
