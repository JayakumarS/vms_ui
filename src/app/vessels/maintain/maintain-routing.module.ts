import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "fleets",
    loadChildren: () =>
      import("./fleets/fleets.module").then((m) => m.FleetsModule),
  },
  {
    path: "vessel-types",
    loadChildren: () =>
      import("./vessel-types/vessel-types.module").then((m) => m.VesselTypesModule),
  },
  {
    path: "class",
    loadChildren: () =>
      import("./class/class.module").then((m) => m.ClassModule),
  },
  {
    path: "classification",
    loadChildren: () =>
      import("./classification/classification.module").then((m) => m.ClassificationModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainRoutingModule { }
