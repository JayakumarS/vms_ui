import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListWorkStatusComponent } from './list-work-status/list-work-status.component';
import { AddWorkStatusComponent } from './add-work-status/add-work-status.component';
import { ViewWorkStatusComponent } from './view-work-status/view-work-status.component';

const routes: Routes = [

  {
    path:"list-Work-Status",
    component:ListWorkStatusComponent
  },
  {
    path:"add-Work-Status/:id",
    component:AddWorkStatusComponent
  },
  {
    path:"view-Work-Status/:id",
    component:ViewWorkStatusComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkStatusRoutingModule { }
