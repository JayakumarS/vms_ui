import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { ViewDepartmentComponent } from './view-department/view-department.component';

const routes: Routes = [
  {
    path:'add-department/:id',
    component:AddDepartmentComponent
  },
  {
    path:'list-department',
    component:ListDepartmentComponent
  },
  {
    path:'view-department/:id',
    component:ViewDepartmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentMasterRoutingModule { }
