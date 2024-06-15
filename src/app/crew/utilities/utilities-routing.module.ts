import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "multi-seamen-insert",
    loadChildren: () =>
      import("./multi-seamen-insert/multi-seamen-insert.module").then((m) => m.MultiSeamenInsertModule),
  },
  {
    path: "multi-seamen-sign-off",
    loadChildren: () =>
      import("./multi-seamen-sign-off/multi-seamen-sign-off.module").then((m) => m.MultiSeamenSignOffModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilitiesRoutingModule { }
