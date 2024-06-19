import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthStatusRoutingModule } from './health-status-routing.module';
import { AddHealthStatusComponent } from './add-health-status/add-health-status.component';
import { ListHealthStatusComponent } from './list-health-status/list-health-status.component';
import { ViewHealthStatusComponent } from './view-health-status/view-health-status.component';


@NgModule({
  declarations: [
    AddHealthStatusComponent,
    ListHealthStatusComponent,
    ViewHealthStatusComponent
  ],
  imports: [
    CommonModule,
    HealthStatusRoutingModule
  ]
})
export class HealthStatusModule { }
