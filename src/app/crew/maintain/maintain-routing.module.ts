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
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainRoutingModule { }
