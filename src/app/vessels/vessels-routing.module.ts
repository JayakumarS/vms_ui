import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "application-topics",
    loadChildren: () =>
      import("./application-topics/application-topics.module").then((m) => m.ApplicationTopicsModule),
  },
  {
    path: "maintain",
    loadChildren: () =>
      import("./maintain/maintain.module").then((m) => m.MaintainModule),
  },

  {
    path: "vessel-particulars",
    loadChildren: () =>
      import("./vessel-particulars/vessel-particulars.module").then((m) => m.VesselParticularsModule),
  },
  {
    path: "reports",
    loadChildren: () =>
      import("./reports/reports.module").then((m) => m.ReportsModule),
  }




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselsRoutingModule { }
