import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDepartmentsComponent } from './list-departments/list-departments.component';
import { AddDepartmentsComponent } from './add-departments/add-departments.component';
import { DepartmentsPopUpComponent } from './departments-pop-up/departments-pop-up.component';
import { DepartmentsPopupComponent } from './departments-popup/departments-popup.component';

const routes: Routes = [

  {
    path: "list-departments",
    component: ListDepartmentsComponent,
  },
  {
    path: "add-departments/:id",
    component: AddDepartmentsComponent,
  },
  {
    path: "departments-pop-up",
    component: DepartmentsPopUpComponent,
  },
  {
    path: "departments-popup",
    component: DepartmentsPopupComponent,
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
