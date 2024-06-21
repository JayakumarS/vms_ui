import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListApplicationsComponent } from './list-applications/list-applications.component';
import { AddApplicationsComponent } from './add-applications/add-applications.component';
import { ViewApplicationsComponent } from './list-applications/view-applications/view-applications.component';

const routes: Routes = [

  {
    path: "list-applications",
    component: ListApplicationsComponent,
  },
  {
    path: "add-applications/:id",
    component: AddApplicationsComponent,
  },
  {
    path: "view-applications/:id",
    component: ViewApplicationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
