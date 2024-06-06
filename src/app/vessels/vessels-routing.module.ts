import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: "application-topics",
    loadChildren: () =>
      import("./application-topics/application-topics.module").then((m) => m.ApplicationTopicsModule),
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselsRoutingModule { }
