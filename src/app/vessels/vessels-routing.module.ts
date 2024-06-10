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
    path: "engine-types",
    loadChildren: () =>
      import("./engine-types/engine-types.module").then((m) => m.EngineTypesModule),
  },
  {
    path: "fleet-managers",
    loadChildren: () =>
      import("./fleet-managers/fleet-managers.module").then((m) => m.FleetManagersModule),
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselsRoutingModule { }
