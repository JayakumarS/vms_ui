import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: "multi-seamen-insert",
    loadChildren: () =>
      import("./multi-seamen-insert/multi-seamen-insert.module").then((m) => m.MultiSeamenInsertModule),
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilitiesRoutingModule { }
