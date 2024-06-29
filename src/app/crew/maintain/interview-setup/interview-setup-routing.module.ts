import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInterviewSetupComponent } from './add-interview-setup/add-interview-setup.component';
import { ListInterviewSetupComponent } from './list-interview-setup/list-interview-setup.component';
import { ViewInterviewSetupComponent } from './view-interview-setup/view-interview-setup.component';

const routes: Routes = [
  {
    path: "add-interview/:id",
    component: AddInterviewSetupComponent,
  },
  {
    path: "list-interview",
    component: ListInterviewSetupComponent,
  },
  {
    path: "view-interview/:id",
    component: ViewInterviewSetupComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewSetupRoutingModule { }
