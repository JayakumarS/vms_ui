import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "interview-setup",
    loadChildren: () =>
      import("./interview-setup/interview-setup.module").then((m) => m.InterviewSetupModule),
  },
  {
    path: "contracts",
    loadChildren: () =>
      import("./contracts/contracts.module").then((m) => m.ContractsModule),
  },
  {
    path: "libraryfile",
    loadChildren: () =>
      import("./library-file/library-file.module").then((m) => m.LibraryFileModule),
  },
  {
    path: "maintain-rank",
    loadChildren: () =>
      import("./maintain-rank/maintain-rank.module").then((m) => m.MaintainRankModule),
  },
  {
    path: "off-sign",
    loadChildren: () =>
      import("./off-sign/off-sign.module").then((m) => m.OffSignModule),
  },
  {
    path: "crew-ticketing",
    loadChildren: () =>
      import("./crew-ticketing/crew-ticketing.module").then((m) => m.CrewTicketingModule),
  },

  {
    path: "rank-group",
    loadChildren: () =>
      import("./rank-group/rank-group.module").then((m) => m.RankGroupModule),
  },

  {
    path: "work-license",
    loadChildren: () =>
      import("./work-license/work-license.module").then((m) => m.WorkLicenseModule),
  },
  {
    path: "work-status",
    loadChildren: () =>
      import("./work-status/work-status.module").then((m) => m.WorkStatusModule),
  },
  {
    path: "language",
    loadChildren: () =>
      import("./languages/languages.module").then((m) => m.LanguagesModule),
  },
  {
    path: "agent",
    loadChildren: () =>
      import("./agent/agent.module").then((m) => m.AgentModule),
  },
  {
    path: "health-status",
    loadChildren: () =>
      import("./health-status/health-status.module").then((m) => m.HealthStatusModule),
  },
  {
    path: "exp-engine",
    loadChildren: () =>
      import("./exp-engine/exp-engine.module").then((m) => m.ExpEngineModule),
  },
  {
    path: "certificates",
    loadChildren: () =>
      import("./certificates/certificates.module").then((m) => m.CertificatesModule),
  },
  {
    path: "trainings",
    loadChildren: () =>
      import("./trainings/trainings.module").then((m) => m.TrainingsModule),
  },
  {
    path: "paytypes",
    loadChildren: () =>
      import("./pay-types/pay-types.module").then((m) => m.PayTypesModule),
  },

  {
    path: "setup-rank",
    loadChildren: () =>
      import("./setup-rank-certificates/setup-rank-certificates.module").then((m) => m.SetupRankCertificatesModule),
  }, 

{
  path: "setup-ranktraining",
  loadChildren: () =>
    import("./setup-rank-trainings/setup-rank-trainings.module").then((m) => m.SetupRankTrainingsModule),
}, 

{
  path: "religion",
  loadChildren: () =>
    import("./religion/religion.module").then((m) => m.ReligionModule),
}, 

{
  path: "blood-group",
  loadChildren: () =>
    import("./blood-group/blood-group.module").then((m) => m.BloodGroupModule),
}, 

{
  path: "Medicals",
  loadChildren: () =>
    import("./medicals/medicals.module").then((m) => m.MedicalsModule),
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainRoutingModule { }
