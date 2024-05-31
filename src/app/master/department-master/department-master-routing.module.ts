import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDepartmentMasterComponent } from './add-department-master/add-department-master.component';
import { ListDepartmentMasterComponent } from './list-department-master/list-department-master.component';
import { ViewDepartmentComponent } from './view-department/view-department.component';
const routes: Routes = [
  {
    path:"add-department/:id",
    component:AddDepartmentMasterComponent,
  },
  {
    path:"list-department",
    component:ListDepartmentMasterComponent,
  },
  {
    path:"viewDepartment/:id",
    component:ViewDepartmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentMasterRoutingModule { }
