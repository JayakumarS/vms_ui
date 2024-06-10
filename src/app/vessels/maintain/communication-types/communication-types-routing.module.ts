import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCommTypesComponent } from './add-comm-types/add-comm-types.component';
import { ListCommTypesComponent } from './list-comm-types/list-comm-types.component';

const routes: Routes = [
  {
    path:'add-communication-types/:0',
    component:AddCommTypesComponent 
  },
  {
    path:'list-communication-types',
    component:ListCommTypesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunicationTypesRoutingModule { }
