import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListApplicationsComponent } from './list-applications/list-applications.component';

const routes: Routes = [
  {
    path: "list-applications",
    component: ListApplicationsComponent,
  },
  {
    path: "person-maintenance",
    loadChildren: () =>
      import("./person-maintenance/person-maintenance.module").then((m) => m.PersonMaintenanceModule),
  },
  {
    path: "applications",
    loadChildren: () =>
      import("./applications/applications.module").then((m) => m.ApplicationsModule),
  },
  {
    path: "seamans-working-shift",
    loadChildren: () =>
      import("./seamans-working-shift/seamans-working-shift.module").then((m) => m.SeamansShiftingSkillsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
