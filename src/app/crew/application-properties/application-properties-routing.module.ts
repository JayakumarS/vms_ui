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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationPropertiesRoutingModule { }
