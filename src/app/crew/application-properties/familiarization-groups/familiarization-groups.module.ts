import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamiliarizationGroupsRoutingModule } from './familiarization-groups-routing.module';
import { AddFamiliarizationGroupsComponent } from './add-familiarization-groups/add-familiarization-groups.component';
import { ListFamiliarizationGroupsComponent } from './list-familiarization-groups/list-familiarization-groups.component';


@NgModule({
  declarations: [
    AddFamiliarizationGroupsComponent,
    ListFamiliarizationGroupsComponent
  ],
  imports: [
    CommonModule,
    FamiliarizationGroupsRoutingModule
  ]
})
export class FamiliarizationGroupsModule { }
