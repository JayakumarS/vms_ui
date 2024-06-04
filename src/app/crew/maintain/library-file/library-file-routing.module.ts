import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLibraryFileComponent } from './add-library-file/add-library-file.component';
import { ListLibraryFileComponent } from './list-library-file/list-library-file.component';

const routes: Routes = [
  // {
  //   path:"list-library",
  //   component:ListLibraryFileComponent
  // },
  {
    path:"add-library",
    component:AddLibraryFileComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryFileRoutingModule { }
