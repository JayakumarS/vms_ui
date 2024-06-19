import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCertificatesComponent } from './list-certificates/list-certificates.component';
import { AddCertificatesComponent } from './add-certificates/add-certificates.component';
import { ViewCertificatesComponent } from './view-certificates/view-certificates.component';

const routes: Routes = [

  {
    path:"list-certificates",
    component:ListCertificatesComponent
  },
  {
    path:"add-certificates/:id",
    component:AddCertificatesComponent
  },
  {
    path:"view-certificates/:id",
    component:ViewCertificatesComponent
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificatesRoutingModule { }
