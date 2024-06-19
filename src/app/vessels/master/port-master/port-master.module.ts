import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortMasterRoutingModule } from './port-master-routing.module';
import { AddPortMasterComponent } from './add-port-master/add-port-master.component';


@NgModule({
  declarations: [
    AddPortMasterComponent
  ],
  imports: [
    CommonModule,
    PortMasterRoutingModule
  ]
})
export class PortMasterModule { }
