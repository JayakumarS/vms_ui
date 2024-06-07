import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "zones",
    loadChildren: () =>
      import("./zones/zones.module").then((m) => m.ZonesModule),
  },
  // {
  //   path: "identifiers-library",
  //   loadChildren: () =>
  //     import("./identifiers-library/identifiers-library.module").then((m) => m.IdentifiersLibraryModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainRoutingModule { }
