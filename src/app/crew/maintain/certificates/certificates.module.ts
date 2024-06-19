import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificatesRoutingModule } from './certificates-routing.module';
import { AddCertificatesComponent } from './add-certificates/add-certificates.component';
import { ListCertificatesComponent } from './list-certificates/list-certificates.component';
import { ViewCertificatesComponent } from './view-certificates/view-certificates.component';


@NgModule({
  declarations: [
    AddCertificatesComponent,
    ListCertificatesComponent,
    ViewCertificatesComponent
  ],
  imports: [
    CommonModule,
    CertificatesRoutingModule
  ]
})
export class CertificatesModule { }
