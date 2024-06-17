import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "vessels-details",
    loadChildren: () =>
      import("./vessels-details/vessels-details.module").then((m) => m.VesselsDetailsModule),
  },
  {
    path: "vessels-history",
    loadChildren: () =>
      import("./vessels-history/vessels-history.module").then((m) => m.VesselsHistoryModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
