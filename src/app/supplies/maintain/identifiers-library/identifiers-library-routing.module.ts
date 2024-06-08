import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddIdentifiersLibraryComponent } from './add-identifiers-library/add-identifiers-library.component';

const routes: Routes = [

  {
    path: "identifiers",
    component: AddIdentifiersLibraryComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentifiersLibraryRoutingModule { }
