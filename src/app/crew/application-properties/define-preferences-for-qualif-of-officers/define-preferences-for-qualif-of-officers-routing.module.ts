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
  {
    path: "define-administation",
    loadChildren: () =>
      import("./define-administation-acceptance/define-administation-acceptance.module").then((m) => m.DefineAdministationAcceptanceModule),
  },

  {
    path: "define-Officers-Qualification",
    loadChildren: () =>
      import("./define-officers-qualification-matching/define-officers-qualification-matching.module").then((m) => m.DefineOfficersQualificationMatchingModule),
  },

  {
    path: "define-Paired-Rank",
    loadChildren: () =>
      import("./define-paired-rank/define-paired-rank.module").then((m) => m.DefinePairedRankModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefinePreferencesForQualifOfOfficersRoutingModule { }
