import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDefineShiftScenarioComponent } from './list-define-shift-scenario/list-define-shift-scenario.component';
import { AddDefineShiftScenarioComponent } from './add-define-shift-scenario/add-define-shift-scenario.component';

const routes: Routes = [
  {
    path: "list-define-shift-scenario",
    component: ListDefineShiftScenarioComponent,
  },
  {
    path: "add-define-shift-scenario/:id",
    component: AddDefineShiftScenarioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefineShiftScenarioRoutingModule { }
