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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
