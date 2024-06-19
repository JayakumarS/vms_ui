import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPortMasterComponent } from './add-port-master/add-port-master.component';

const routes: Routes = [
  {
    path : 'add-port-master/:id',
    component : AddPortMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortMasterRoutingModule { }
