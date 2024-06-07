import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "Vessels-particulars",
    loadChildren: () =>
      import("./vessels-particulars/vessels-particulars.module").then((m) => m.VesselsParticularsModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationTopicsRoutingModule { }
