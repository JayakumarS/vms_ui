import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSeamansShiftingSkillsComponent } from './add-seamans-shifting-skills/add-seamans-shifting-skills.component';

const routes: Routes = [
  {
    path:"add-seamans-shifting-skills",
    component:AddSeamansShiftingSkillsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeamensShiftingSkillsRoutingModule { }
