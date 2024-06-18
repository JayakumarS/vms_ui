import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListWorkLicenseComponent } from './list-work-license/list-work-license.component';
import { AddWorkLicenseComponent } from './add-work-license/add-work-license.component';
import { ViewWorkLicenseComponent } from './view-work-license/view-work-license.component';

const routes: Routes = [

  {
    path:"list-Work-License",
    component:ListWorkLicenseComponent
  },
  {
    path:"add-Work-License/:id",
    component:AddWorkLicenseComponent
  },
  {
    path:"view-Work-License/:id",
    component:ViewWorkLicenseComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkLicenseRoutingModule { }
