import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "familiarization-types",
    loadChildren: () =>
      import("./familiarization-types/familiarization-types.module").then((m) => m.FamiliarizationTypesModule),
  },
  {
    path: "familiarization-groups",
    loadChildren: () =>
      import("./familiarization-groups/familiarization-groups.module").then((m) => m.FamiliarizationGroupsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationPropertiesRoutingModule { }
