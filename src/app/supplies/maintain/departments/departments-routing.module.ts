import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDepartmentsComponent } from './list-departments/list-departments.component';
import { AddDepartmentsComponent } from './add-departments/add-departments.component';


const routes: Routes = [

  {
    path: "list-departments",
    component: ListDepartmentsComponent,
  },
  {
    path: "add-departments/:id",
    component: AddDepartmentsComponent,
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
