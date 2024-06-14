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
  },
  {
    path: "define-crew-evaluation-legends",
    loadChildren: () =>
      import("./define-evaluation-legends/define-evaluation-legends.module").then((m) => m.DefineEvaluationLegendsModule),
  },
  {
    path: "evaluation-departments-per-user",
    loadChildren: () =>
      import("./evaluation-departments-per-user/evaluation-departments-per-user.module").then((m) => m.EvaluationDepartmentsPerUserModule),
  },
  {
    path: "crew-promotion",
    loadChildren: () =>
      import("./crew-promotion/crew-promotion.module").then((m) => m.CrewPromotionModule),
  },
  {
    path: "crew-payroll-currency",
    loadChildren: () =>
      import("./crew-payroll-currency/crew-payroll-currency.module").then((m) => m.CrewPayrollCurrencyModule),
  },
  {
    path: "user-agent-link",
    loadChildren: () =>
      import("./user-agent-link/user-agent-link.module").then((m) => m.UserAgentLinkModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationPropertiesRoutingModule { }
