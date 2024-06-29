import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPersonMaintenanceComponent } from './list-person-maintenance/list-person-maintenance.component';
import { AddPersonMaintenanceComponent } from './add-person-maintenance/add-person-maintenance.component';
import { ListImmigrationCrewComponent } from './list-immigration-crew/list-immigration-crew.component';

const routes: Routes = [
  {
    path: "list-person-maintenance",
    component: ListPersonMaintenanceComponent,
  },
  {
    path: "add-person-maintenance/:id",
    component: AddPersonMaintenanceComponent,
  },
  {
    path: "list-immigration-crew",
    component: ListImmigrationCrewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonMaintenanceRoutingModule { }
