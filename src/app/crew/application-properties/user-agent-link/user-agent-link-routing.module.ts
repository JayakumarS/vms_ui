import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserAgentLinkComponent } from './list-user-agent-link/list-user-agent-link.component';
import { AddUserAgentLinkComponent } from './add-user-agent-link/add-user-agent-link.component';

const routes: Routes = [
  {
    path:'list-user-agent-link',
    component: ListUserAgentLinkComponent
  },
  {
    path:'add-user-agent-link/:id',
    component: AddUserAgentLinkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAgentLinkRoutingModule { }
