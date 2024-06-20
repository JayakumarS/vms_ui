import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPortMasterComponent } from './add-port-master/add-port-master.component';
import { ListPortMasterComponent } from './list-port-master/list-port-master.component';
import { ViewPortMasterComponent } from './view-port-master/view-port-master.component';

const routes: Routes = [
  {
    path : 'add-port-master/:id',
    component : AddPortMasterComponent
  },
  {
    path : 'list-port-master',
    component : ListPortMasterComponent
  },
  {
    path : 'view-port-master/:id',
    component : ViewPortMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortMasterRoutingModule { }
