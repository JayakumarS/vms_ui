import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAgentComponent } from './view-agent/view-agent.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { ListAgentComponent } from './list-agent/list-agent.component';

const routes: Routes = [

  {
    path:"list-agent",
    component:ListAgentComponent
  },
  {
    path:"add-agent/:id",
    component:AddAgentComponent
  },
  {
    path:"view-agent/:id",
    component:ViewAgentComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
