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
  {
    path: "crew-familiarization",
    loadChildren: () =>
      import("./crew-familiarization/crew-familiarization.module").then((m) => m.CrewFamiliarizationModule),
  },
  {
    path: "utilities",
    loadChildren: () =>
      import("./utilities/utilities.module").then((m) => m.UtilitiesModule),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path:"currency-master",
    loadChildren: () =>
      import("./currency-master/currency-master.module").then((m) => m.CurrencyMasterModule),
  },
  {
    path:"department-master",
    loadChildren: () =>
      import("./department-master/department-master.module").then((m) => m.DepartmentMasterModule),
  },
  {
    path: "crew-vessel-assignment",
    loadChildren: () =>
      import("./crew-vessel-assignment/crew-vessel-assignment.module").then((m) => m.CrewVesselAssignmentModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrewRoutingModule { }
