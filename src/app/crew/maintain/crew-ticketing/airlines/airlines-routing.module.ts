import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAirlinesComponent } from './add-airlines/add-airlines.component';
import { ListAirlinesComponent } from './list-airlines/list-airlines.component';

const routes: Routes = [
  {
    path: "list-airlines",
    component: ListAirlinesComponent,
  },
  {
    path: "add-airlines/:id",
    component: AddAirlinesComponent,
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirlinesRoutingModule { }
