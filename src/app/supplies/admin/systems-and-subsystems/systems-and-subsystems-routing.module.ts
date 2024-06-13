import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSystemsAndSubsystemsComponent } from './add-systems-and-subsystems/add-systems-and-subsystems.component';
import { ListSystemsAndSubsystemsComponent } from './list-systems-and-subsystems/list-systems-and-subsystems.component';

const routes: Routes = [
  {
    path: "add-systems-and-subsystems/:id",
    component: AddSystemsAndSubsystemsComponent,
  },
  {
    path: "list-systems-and-subsystems",
    component: ListSystemsAndSubsystemsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemsAndSubsystemsRoutingModule { }
