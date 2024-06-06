import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "define-ranks",
    loadChildren: () =>
      import("./define-ranks/define-ranks.module").then((m) => m.DefineRanksModule),
  },

  {
    path: "define-vessal-group",
    loadChildren: () =>
      import("./define-vessal-group/define-vessal-group.module").then((m) => m.DefineVessalGroupModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefinePreferencesForQualifOfOfficersRoutingModule { }