import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "applications",
    loadChildren: () =>
      import("./applications/applications.module").then((m) => m.ApplicationsModule),
  },
  {
    path: "maintain",
    loadChildren: () =>
      import("./maintain/maintain.module").then((m) => m.MaintainModule),
  },
  {
    path: "application-properties",
    loadChildren: () =>
      import("./application-properties/application-properties.module").then((m) => m.ApplicationPropertiesModule),
  },
  {
    path: "seamans-contract",
    loadChildren: () =>
      import("./seamans-contract/seamans-contract.module").then((m) => m.SeamansContractModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrewRoutingModule { }
