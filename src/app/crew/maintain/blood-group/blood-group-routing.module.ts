import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBloodGroupComponent } from './list-blood-group/list-blood-group.component';
import { AddBloodGroupComponent } from './add-blood-group/add-blood-group.component';
import { ViewBloodGroupComponent } from './view-blood-group/view-blood-group.component';

const routes: Routes = [

  {
    path: "list-blood-group",
    component: ListBloodGroupComponent,
  },
  {
    path: "add-blood-group/:id",
    component: AddBloodGroupComponent,
  },
  {
    path: "view-blood-group/:id",
    component: ViewBloodGroupComponent,
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloodGroupRoutingModule { }
