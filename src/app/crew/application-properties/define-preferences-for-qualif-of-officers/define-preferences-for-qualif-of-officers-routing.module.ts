import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "define-ranks",
    loadChildren: () =>
      import("./define-ranks/define-ranks.module").then((m) => m.DefineRanksModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefinePreferencesForQualifOfOfficersRoutingModule { }
