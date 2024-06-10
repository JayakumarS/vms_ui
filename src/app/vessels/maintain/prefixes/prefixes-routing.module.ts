import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPrefixesComponent } from './add-prefixes/add-prefixes.component';
import { ListPrefixesComponent } from './list-prefixes/list-prefixes.component';

const routes: Routes = [
  {
    path: 'add-prefixes/:0',
    component:AddPrefixesComponent
  },
  {
    path: 'list-prefixes',
    component:ListPrefixesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrefixesRoutingModule { }
