import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInterviewSetupComponent } from './add-interview-setup/add-interview-setup.component';

const routes: Routes = [
  {
    path: "add-interview",
    component: AddInterviewSetupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainRoutingModule { }
