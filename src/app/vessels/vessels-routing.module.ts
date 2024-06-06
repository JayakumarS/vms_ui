import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "application-topics",
    loadChildren: () =>
      import("./application-topics/application-topics.module").then((m) => m.ApplicationTopicsModule),
  },
  {
    path: "maintain",
    loadChildren: () =>
      import("./maintain/maintain.module").then((m) => m.MaintainModule),
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselsRoutingModule { }
