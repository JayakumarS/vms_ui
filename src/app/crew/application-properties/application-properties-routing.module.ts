import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "familiarization-types",
    loadChildren: () =>
      import("./familiarization-types/familiarization-types.module").then((m) => m.FamiliarizationTypesModule),
  },
  {

    path: "familiarization-groups",
    loadChildren: () =>
      import("./familiarization-groups/familiarization-groups.module").then((m) => m.FamiliarizationGroupsModule),
  },
  {
    path: "familiarization-items",
    loadChildren: () =>
      import("./familiarization-items/familiarization-items.module").then((m) => m.FamiliarizationItemsModule),
  },
  {
    path: "define-preferences-for-qualif-of-officers",
    loadChildren: () =>
      import("./define-preferences-for-qualif-of-officers/define-preferences-for-qualif-of-officers.module").then((m) => m.DefinePreferencesForQualifOfOfficersModule),
  },
  {
    path: "company-department",
    loadChildren: () =>
      import("./company-department/company-department.module").then((m) => m.CompanyDepartmentModule),
  },
  {
    path: "office-evaluation",
    loadChildren: () =>
      import("./office-evaluations/office-evaluations.module").then((m) => m.OfficeEvaluationsModule),
  },
  {
    path: "define-crew-evaluation-criteria",
    loadChildren: () =>
      import("./define-crew-evaluation-criteria/define-crew-evaluation-criteria.module").then((m) => m.DefineCrewEvaluationCriteriaModule),
  },

  { 
    path: "define-preferences-for-working-hours",
    loadChildren: () =>
      import("./define-preferences-for-working-hours/define-preferences-for-working-hours.module").then((m) => m.DefinePreferencesForWorkingHoursModule),
  },
  {
    path: "define-crew-evaluation-scales",
    loadChildren: () =>
      import("./define-evaluation-scales/define-evaluation-scales.module").then((m) => m.DefineEvaluationScalesModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationPropertiesRoutingModule { }
