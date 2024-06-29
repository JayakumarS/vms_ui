import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: "reports",
    loadChildren: () =>
      import("./reports/reports.module").then((m) => m.ReportsModule),
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IsmRoutingModule { }
