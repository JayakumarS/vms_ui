import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDesingnationMasterComponent} from './add-desingnation-master/add-desingnation-master.component';
import { ListDesingnationMasterComponent } from './list-desingnation-master/list-desingnation-master.component';
import { ViewDesignationComponent } from './view-designation/view-designation.component';
const routes: Routes = [
{
  path:"add-designation/:id",
  component:AddDesingnationMasterComponent,
},
{
  path:"list-designation",
  component:ListDesingnationMasterComponent,
},
{
  path:"view-designation/:id",
  component:ViewDesignationComponent,
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationMasterRoutingModule { }
