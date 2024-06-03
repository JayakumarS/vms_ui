import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInterviewSetupComponent } from './add-interview-setup/add-interview-setup.component';
import { ListInterviewSetupComponent } from './list-interview-setup/list-interview-setup.component';

const routes: Routes = [
  {
    path: "add-interview",
    component: AddInterviewSetupComponent,
  },
  {
    path: "list-interview",
    component: ListInterviewSetupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewSetupRoutingModule { }
