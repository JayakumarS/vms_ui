import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMaintainCountersComponent } from './add-maintain-counters/add-maintain-counters.component';

const routes: Routes = [
  {
    path: 'add-maintain-counters',
    component: AddMaintainCountersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainCountersRoutingModule { }
