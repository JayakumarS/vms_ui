import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintainRoutingModule } from './maintain-routing.module';
import { AddInterviewSetupComponent } from './add-interview-setup/add-interview-setup.component';


@NgModule({
  declarations: [
    AddInterviewSetupComponent
  ],
  imports: [
    CommonModule,
    MaintainRoutingModule
  ]
})
export class MaintainModule { }
