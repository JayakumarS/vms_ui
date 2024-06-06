import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { List } from 'angular-feather/icons';
import { ListDefineAdministationAcceptanceComponent } from './list-define-administation-acceptance/list-define-administation-acceptance.component';
import { AddDefineAdministationAcceptanceComponent } from './add-define-administation-acceptance/add-define-administation-acceptance.component';

const routes: Routes = [

  {
    path: "list-Define-administation",
    component: ListDefineAdministationAcceptanceComponent,
  },
  {
    path: "add-Define-administation/:id",
    component: AddDefineAdministationAcceptanceComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefineAdministationAcceptanceRoutingModule { }
