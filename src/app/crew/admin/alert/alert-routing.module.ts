import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "onboard-user-alerts",
    loadChildren: () =>
      import("./onboard-user-alerts/onboard-user-alerts.module").then((m) => m.OnboardUserAlertsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertRoutingModule { }
