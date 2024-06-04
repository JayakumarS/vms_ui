import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "familiarization-types",
    loadChildren: () =>
      import("./familiarization-types/familiarization-types.module").then((m) => m.FamiliarizationTypesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationPropertiesRoutingModule { }
