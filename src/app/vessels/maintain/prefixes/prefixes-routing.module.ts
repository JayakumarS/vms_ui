import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPrefixesComponent } from './add-prefixes/add-prefixes.component';
import { ListPrefixesComponent } from './list-prefixes/list-prefixes.component';
import { ViewPrefixesComponent } from './view-prefixes/view-prefixes.component';

const routes: Routes = [
  {
    path: 'add-prefixes/:id',
    component:AddPrefixesComponent
  },
  {
    path: 'list-prefixes',
    component:ListPrefixesComponent
  },
  {
    path: 'view-prefixes/:id',
    component:ViewPrefixesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrefixesRoutingModule { }
